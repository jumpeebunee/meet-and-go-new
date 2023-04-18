import { arrayRemove, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { IEvent } from "../types/types"
import { db } from "../firebase";

export const unactiveEvents = async(event: IEvent) => {
  const eventDate = new Date(event.date).getTime();

  if (eventDate - Date.now() <= 0) {
    try {
      for (let user of event.activeUsers) {
        await updateDoc(doc(db, "users", user.id), {
          activeMeets: arrayRemove(event.id)
        });
      }
      await deleteDoc(doc(db, "events", event.id));
    } catch (error) {
      console.log(error);
    }
  } 
}