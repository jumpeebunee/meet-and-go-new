import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { openedEvent } from "../../app/feautures/openedEventSlice";
import { user } from "../../app/feautures/userSlice";
import { db } from "../../firebase";
import { IChat, IMessage } from "../../types/types";
import styles from "./chatPage.module.scss";
import Input from "./components/Input";
import Message from "./components/Message";
import { IonContent, IonPage } from "@ionic/react";

interface ChatProps {}

const Chat = (props: ChatProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chat, setChat] = useState<IChat>();

  const currentUser = useSelector(user);
  const event = useSelector(openedEvent);

  const getChat = async () => {
    try {
      const chatRes = await getDoc(doc(db, `chats`, event.chatId));
			if (!chatRes.exists()) {
				throw new Error('chat not exist')
			}
      const chat = chatRes.data() as IChat;
			setChat(chat)

      const q = query(
        collection(db, "messages"),
        where("id", "in", chat.messageIds)
      );
      const messagesRes = await getDocs(q);
      const messages = messagesRes.docs.map((d) => d.data()) as IMessage[];
      setMessages(messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
		getChat()
    const unsubChat = onSnapshot(
      doc(db, "chats", event.chatId),
      (snapshot) => {
        console.log("snapshot sub", snapshot);
        const chat = snapshot.data() as IChat;
				console.log('chat', chat)
      }
    );
    return unsubChat;
  }, []);

	if (!messages.length) return <>Loading...</>

  return (
    <IonPage>
      <IonContent>
        <div className={styles.chat}>
          <div>
            {messages.map((el) => (
              <Message key={el.id} body={el.body} createdById={el.createdById} />
            ))}
          </div>
          <Input chatId={event.chatId} userId={currentUser.uid} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
