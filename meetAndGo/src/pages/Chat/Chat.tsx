import { IonContent, IonModal } from "@ionic/react";
import { nanoid } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../app/feautures/userSlice";
import { db } from "../../firebase";
import { IChat, IChatPopulated, IMessage } from "../../types/types";
import styles from "./chatPage.module.scss";
import { getCurrentChatId, getIsOpen } from "./chatSlice";
import Input from "./components/Input";
import Message from "./components/Message";
import { getUsers } from "./helpers";

interface ChatProps {}

const Chat = (props: ChatProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chat, setChat] = useState<IChatPopulated>();

  const isOpen = useSelector(getIsOpen);
  const currentUser = useSelector(user);
  const currentChatId = useSelector(getCurrentChatId);

  const handleSendMessage = async (body: string) => {
    try {
      if (!currentChatId) {
        throw new Error("currentChatId is undefined");
      }
      const messageId = nanoid();
      const messageDoc: IMessage = {
        id: messageId,
        chatId: currentChatId,
        body,
        type: "text",
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        createdById: currentUser.uid,
      };
      const batch = writeBatch(db);
      batch.set(doc(db, "messages", messageId), messageDoc);
      batch.update(doc(db, "chats", currentChatId), {
        messageIds: arrayUnion(messageId),
      });
      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen && currentChatId) {
      const q = query(
        collection(db, "messages"),
        where("chatId", "==", currentChatId)
      );
      const unsubMessages = onSnapshot(q, async (snap) => {
        const res = snap.docChanges().map((el) => el.doc.data()) as IMessage[];
        const { hasPendingWrites, fromCache } = snap.metadata;
        if (!hasPendingWrites) setMessages((prev) => [...prev, ...res]);
      });
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
      };
    } else {
      setChat(undefined);
      setMessages([]);
    }
  }, [isOpen]);

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <div className={`modal-container ${styles.chat}`}>
          {currentChatId && chat ? (
            <>
              <div className={styles.messageList}>
                {messages.map((el) => (
                  <Message
                    key={el.id}
                    username={
                      chat.users.find((u) => u.uid == el.createdById)?.username
                    }
                    body={el.body}
                  />
                ))}
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Введите сообщение"
                  onSend={handleSendMessage}
                />
              </div>
            </>
          ) : (
            <h2>Select chat</h2>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default Chat;
