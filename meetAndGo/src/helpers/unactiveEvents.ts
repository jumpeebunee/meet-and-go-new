import { arrayRemove, arrayUnion, deleteDoc, doc, increment, updateDoc,} from "firebase/firestore";
import { IEvent } from "../types/types"
import { db } from "../firebase";

export const unactiveEvents = async(event: IEvent) => {
  const eventDate = new Date(event.date).getTime();

  if (eventDate - Date.now() <= 0) {
    try {
      for (let user of event.activeUsers) {
        if (user.id === event.leader) {
          await updateDoc(doc(db, "users", user.id), {
            activeMeets: arrayRemove(event.id),
            reputation: (user.reputation < 50000) ? increment(50) : increment(0),
          });
        } else {
          await updateDoc(doc(db, "users", user.id), {
            activeMeets: arrayRemove(event.id),
            reputation: (user.reputation < 50000) ? increment(50) : increment(0),
            notifications: arrayUnion(event),
          });
        }
      }
      await deleteDoc(doc(db, "events", event.id));
    } catch (error) {
      console.log(error);
    }
  } 
}