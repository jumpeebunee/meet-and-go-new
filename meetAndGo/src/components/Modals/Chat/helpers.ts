import { Timestamp, arrayUnion, collection, doc, getDocs, query, setDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../../../firebase";
import { IMessage, IMessageLoaded, IUser } from "../../../types/types";
import { nanoid } from "@reduxjs/toolkit";

export const searchUserById = (users: IUser[], seachUserId: string) =>
  users.find((el) => el.uid == seachUserId);

export const getUsers = async (userIds: string[]) => {
  const q = query(collection(db, "users"), where("uid", "in", userIds));
  const usersRes = await getDocs(q);
  return usersRes.docs.map((el) => el.data() as IUser);
};

export const formatTimestamp = (stamp: Timestamp) => {
  const date = new Date(stamp as any * 1000);
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(date);
};

export const uploadMessage = (
  userId: string,
  message: Pick<
    IMessage,
    'chatId' | 'body' | 'type'
  >
): IMessageLoaded => {
  const messageId = nanoid();
  const messageDoc: IMessage = {
    id: messageId,
    chatId: message.chatId,
    body: message.body,
    type: message.type,
    updatedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    createdById: userId,
  };
	setDoc(doc(db, "messages", messageId), messageDoc);
  return { ...messageDoc, isLoading: true};
};
