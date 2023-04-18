import { deleteDoc, doc} from "firebase/firestore";
import { IEvent } from "../types/types"
import { db } from "../firebase";

export const unactiveEvents = async(event: IEvent) => {
  const eventDate = new Date(event.date).getTime();

  if (eventDate - Date.now() <= 0) {
    await deleteDoc(doc(db, "events", event.id));
  } 
}