import { IonContent, IonModal, IonSpinner } from "@ionic/react";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  endAt,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openedEvent } from "../../../app/feautures/openedEventSlice";
import { user } from "../../../app/feautures/userSlice";
import { store } from "../../../app/store";
import ChatWS from "../../../features/ChatWS";
import { IResponse } from "../../../features/ChatWS/types";
import { db, storage } from "../../../firebase";
import convertToBase64 from "../../../helpers/convertToBase64";
import formatEventDate from "../../../helpers/formatEventDate";
import {
  IChat,
  IChatPopulated,
  IMessage,
  IMessageLoaded,
} from "../../../types/types";
import Header from "../../Base/Header";
import Message from "../../Base/Message";
import Input from "../../Base/MessageInput";
import OwnerMessage from "../../Base/OwnerMessage";
import styles from "./chatPage.module.scss";
import LoadMoreSpinner from "./components/LoadMoreIcon";
import {
  formatTimestamp,
  getUsers,
  updateMessage,
  uploadMessage,
} from "./helpers";
import { chatActions, getCurrentChatId, getIsOpen } from "./slice";

const PAGE_OFSET = 20;

interface ChatProps {}

const Chat = (props: ChatProps) => {
  const [messages, setMessages] = useState<IMessageLoaded[]>([]);
  const [chat, setChat] = useState<IChatPopulated>();

  const dispatch = useDispatch();
  const event = useSelector(openedEvent);
  const isOpen = useSelector(getIsOpen);
  const currentUser = useSelector(user);
  const currentChatId = useSelector(getCurrentChatId);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const loadMoreSpinnerRef = useRef<HTMLDivElement | null>(null);

  const isMessagesEmpty = useRef(false);
  const isNeedLastMessFocus = useRef(false);
  // const isScrollFarFromChat = useRef(false);
  const lastMessageDoc = useRef<QueryDocumentSnapshot>();
  const isLoadingMore = store.getState().chat.isLoadingMore;

  useEffect(() => {
    if (isNeedLastMessFocus.current && messagesRef.current) {
      messagesRef.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
      isNeedLastMessFocus.current = false;
    }
  }, [messages, chat]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    if (loadMoreSpinnerRef.current) {
      observer.observe(loadMoreSpinnerRef.current);
    }
    return () => observer.disconnect();
  }, [loadMoreSpinnerRef.current, chat]);

  useEffect(() => {
    ChatWS.socket.onmessage = (resp: MessageEvent) => {
      const data = JSON.parse(resp.data) as IResponse;
      switch (data.type) {
        case "message:send":
          if (isOpen) {
            const updatedMessages = updateMessage(messages, data.body);
            setMessages(() => {
              isNeedLastMessFocus.current = true;
              return updatedMessages;
            });
          }
          break;
        case "event:enter":
          if (isOpen && currentChatId == data.body.chatId) {
            getChat();
          }
      }
    };
  }, [isOpen, messages, chat]);

  useEffect(() => {
    if (isOpen && currentChatId) {
      getChat();
      getMessages();
    }
    return () => {
      setMessages([]);
      setChat(undefined);
      isMessagesEmpty.current = false;
      // isScrollFarFromChat.current = false;
      lastMessageDoc.current = undefined;
    };
  }, [isOpen]);

  const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !isLoadingMore && !isMessagesEmpty.current) {
      getMessages(false);
    }
  };

  const getChat = useCallback(async () => {
    const chatResp = await getDoc(doc(db, "chats", currentChatId!));
    const chat = chatResp.data() as IChat;
    const users = await getUsers(chat.userIds);
    setChat({ ...chat, users });
  }, [currentChatId]);

  const getMessages = useCallback(
    async (needLastMesFocus = true) => {
			dispatch(chatActions.set({isLoadingMore: true}))

      let q;
			if (lastMessageDoc.current) {
				q = query(
          collection(db, "messages"),
          where("chatId", "==", currentChatId),
          orderBy("createdAt", "desc"),
          startAfter(lastMessageDoc.current),
          limit(PAGE_OFSET)
        );
			} else {
				q = query(
					collection(db, "messages"),
					where("chatId", "==", currentChatId),
					orderBy("createdAt", "desc"),
					limit(PAGE_OFSET)
				);
			}
      const messagesResp = await getDocs(q);
      const messagesDocs = messagesResp.docs;
      if (messagesDocs.length == 0) {
        isMessagesEmpty.current = true;
        dispatch(chatActions.set({ isLoadingMore: false }));
        return;
      }
      lastMessageDoc.current = messagesDocs[messagesDocs.length - 1];
      const messages = messagesDocs.map((el) => el.data() as IMessage);
      setMessages((prev) => {
        isNeedLastMessFocus.current = needLastMesFocus;
        return [...messages.reverse(), ...prev];
      });
      dispatch(chatActions.set({ isLoadingMore: false }));
    },
    [currentChatId, isMessagesEmpty.current]
  );

  const currentDate = formatEventDate(event.date);
  const isChatExist = currentChatId && chat;

  const handleSendMessage = async (body: string) => {
    try {
      if (!currentChatId) {
        throw new Error("currentChatId is undefined");
      }
      const createdMessage = uploadMessage(currentUser.uid, {
        body,
        chatId: currentChatId,
        type: "text",
      });
      setMessages((prev) => {
        isNeedLastMessFocus.current = true;
        return [...prev, createdMessage];
      });

      const messageToSend: IMessageLoaded = {
        ...createdMessage,
        isLoading: undefined,
      };
      ChatWS.onSendMessage(messageToSend);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    dispatch(chatActions.set({ isOpen: false }));
  };

  const handleFileSet = async (file: File) => {
    const imgBase64 = (await convertToBase64(file)) as string;
    const createdMessage = uploadMessage(currentUser.uid, {
      body: imgBase64,
      type: "image",
      chatId: currentChatId!,
    });
    setMessages((prev) => {
      isNeedLastMessFocus.current = true;
      return [...prev, createdMessage];
    });

    const messageToSend: IMessageLoaded = {
      ...createdMessage,
      isLoading: undefined,
    };
    ChatWS.onSendMessage(messageToSend);

    const imgRef = ref(storage, `chat_images/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    uploadTask.on(
      "state_changed",
      (snap) => {},
      (err) => {},
      async () => {
        const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, "messages", createdMessage.id!), {
          body: imgUrl,
        });
      }
    );
  };

  const returnMessage = (message: IMessageLoaded) => {
    if (chat) {
      const user = chat.users.find((u) => u.uid == message.createdById);
      if (!user) {
        throw new Error("user not found");
      }
      const formatedDate = formatTimestamp(message.createdAt);
      return currentUser.uid == message.createdById ? (
        <OwnerMessage
          key={message.id}
          type={message.type}
          body={message.body}
          date={formatedDate}
          isLoading={message.isLoading}
        />
      ) : (
        <Message
          key={message.id}
          avatar={user.image}
          type={message.type}
          date={formatedDate}
          username={user.username}
          body={message.body}
        />
      );
    }
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={styles.chat}>
          <Header
            title={event.title}
            subtitle={currentDate}
            onBackClick={handleClose}
          />
          <div className={styles.content}>
            {isChatExist ? (
              <div ref={messagesRef} className={styles.messageList}>
                <LoadMoreSpinner ref={loadMoreSpinnerRef} />
                {messages.map((el) => returnMessage(el))}
              </div>
            ) : (
              <IonSpinner
                style={{ margin: "auto", color: "#75D7A1" }}
                name="crescent"
              ></IonSpinner>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              disabled={!isChatExist}
              placeholder="Введите сообщение"
              onTextSend={handleSendMessage}
              onFileSet={handleFileSet}
              accept="image/*"
            />
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default Chat;
