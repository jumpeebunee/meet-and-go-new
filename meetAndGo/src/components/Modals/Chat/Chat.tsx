import { IonContent, IonModal, IonSpinner } from "@ionic/react";
import {
	QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  startAfter,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openedEvent } from "../../../app/feautures/openedEventSlice";
import { user } from "../../../app/feautures/userSlice";
import { store } from "../../../app/store";
import { db, storage } from "../../../firebase";
import convertToBase64 from "../../../helpers/convertToBase64";
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
import { chatActions, getCurrentChatId, getIsOpen } from "./chatSlice";
import LoadMoreSpinner from "./components/LoadMoreIcon";
import {
  formatTimestamp,
  getUsers,
  uploadMessage,
} from "./helpers";

const PAGE_OFSET = 50;

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

  const isMessagesEmpty = useRef(false);
  const isNeedLastMessFocus = useRef(false);
	const isScrollFarFromChat = useRef(false)
	const lastMessageDoc = useRef<QueryDocumentSnapshot>()

  useEffect(() => {
    if (isNeedLastMessFocus.current && messagesRef.current) {
      messagesRef.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
			isNeedLastMessFocus.current = false
    }
  });

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    dispatch(chatActions.setFields({ isOpen: false }));
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

  useEffect(() => {
    if (isOpen && currentChatId) {
      const q = query(
        collection(db, "messages"),
        where("chatId", "==", currentChatId),
        orderBy("createdAt", 'desc'),
        limit(PAGE_OFSET)
      );
      const unsubMessages = onSnapshot(
        q,
        { includeMetadataChanges: true },
        async (snap) => {
          if (!snap.metadata.hasPendingWrites) {
						const messagesDocs = [...snap.docs].reverse()
						const updatedMessages = messagesDocs.map((el) =>
              el.data()
            ) as IMessage[];
						lastMessageDoc.current = messagesDocs[0];
						setMessages(() => {
							isMessagesEmpty.current = false;
							if (!isScrollFarFromChat.current) {
								isNeedLastMessFocus.current = true;
							}
							return updatedMessages
						})
          }
        }
      );
      const unsubChat = onSnapshot(
        doc(db, "chats", currentChatId),
        async (snap) => {
          const updatedChat = snap.data() as IChat;
          const users = await getUsers(updatedChat.userIds);
          setChat({ ...(chat ?? updatedChat), users });
        }
      );
			return () => {
				unsubMessages();
				unsubChat();
				setMessages([])
				setChat(undefined)
				isMessagesEmpty.current = false
				isScrollFarFromChat.current = false
			};
    }
  }, [isOpen, currentChatId]);

  useEffect(() => {
    async function handleScroll(e: any) {
      if (
        e.target.scrollTop < 30 &&
        !isMessagesEmpty.current &&
        !store.getState().chat.isLoadingMore
      ) {
        dispatch(chatActions.setFields({ isLoadingMore: true }));
        const q = query(
          collection(db, "messages"),
          where("chatId", "==", currentChatId),
          orderBy("createdAt", "desc"),
					startAfter(lastMessageDoc.current),
          limit(PAGE_OFSET)
        );
        const messageResp = await getDocs(q);
				if (messageResp.size === 0) {
					isMessagesEmpty.current = true;
					dispatch(chatActions.setFields({ isLoadingMore: false }));
					return;
				}
				const messagesDocs = [...messageResp.docs].reverse();
				const newMessages = messagesDocs.map((el) =>
					el.data()
				) as IMessage[];
				lastMessageDoc.current = messagesDocs[0];
        setMessages((prev) => [...newMessages, ...prev]);
        dispatch(chatActions.setFields({ isLoadingMore: false }));
      } else if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight > 600) {
				isScrollFarFromChat.current = true
			} else {
				isScrollFarFromChat.current = false
			}
    }
    if (isOpen && messagesRef.current) {
      messagesRef.current.addEventListener("scroll", handleScroll);
    }
  }, [isOpen, messagesRef.current, chat]);

  const returnMessage = (message: IMessageLoaded) => {
    const user = chat?.users.find((u) => u.uid == message.createdById);
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
  };

  const currentDate = new Date(event.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const isChatExist = currentChatId && chat;

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
                <LoadMoreSpinner />
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
