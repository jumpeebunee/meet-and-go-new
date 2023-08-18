import { arrayRemove, deleteDoc, doc, increment, updateDoc,} from "firebase/firestore";

import { db } from "../firebase";
import { IEvent } from "../types/types"

export const unactiveEvents = async(event: IEvent) => {
  const eventDate = new Date(event.date).getTime();

  if (eventDate - Date.now() <= 0) {
    try {
      for (const user of event.activeUsers) {
        await updateDoc(doc(db, "users", user.id), {
          activeMeets: arrayRemove(event.id),
          reputation: (user.reputation < 50000) ? increment(50) : increment(0),
        });
      }
      await deleteDoc(doc(db, "events", event.id));
    } catch (error) {
      console.log(error);
    }
  } 
}