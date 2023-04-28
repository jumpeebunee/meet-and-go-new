import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { IUser } from "../../types/types";

export const searchUserById = (users: IUser[], seachUserId: string) =>
  users.find((el) => el.uid == seachUserId);

export const getUsers = async (userIds: string[]) => {
  const q = query(collection(db, "users"), where("uid", "in", userIds));
  const usersRes = await getDocs(q);
  return usersRes.docs.map((el) => el.data() as IUser);
};
