import { serverTimestamp } from "firebase/firestore";

export type ILogin = {
  email: string;
  password: string;
}

export type IRegister = {
  email: string;
  password: string;
  fullname: string;
}

export type IUser = {
  email: string;
  interests: string[];
  phone: string;
  town: string;
  uid: string;
  username: string;
  reputation: number;
  totalMeets: number;
  currentCreated: number
  createdMeets: number;
  image: string;
  archive: IEvent[];
  activeMeets: string[];
  role: string;
  isBanned: boolean;
  notifications?: IEvent[];
}

export type IActive = {
  id: string;
  image: string;
  reputation: number;
}

export type IEvent = {
  activeUsers: IActive[];
  address: string;
  contribution: string;
  coords: number[];
  date: string;
  id: string;
  leader: string;
  location: string;
  placemark: number;
  title: string;
  totalUsers: number;
	chatId: string;
}

export interface IChat {
	id: string,
	userIds: string[],
	messageIds: string[]
}

export interface IChatPopulated extends IChat {
	users: IUser[]
}

export interface IMessage {
  id: string;
	chatId: string,
  createdById: string;
  type: "text" | "image";
  body: string;
  createdAt: ReturnType<typeof serverTimestamp>;
  updatedAt: ReturnType<typeof serverTimestamp>;
}