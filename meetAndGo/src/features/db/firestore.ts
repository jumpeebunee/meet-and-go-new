import { arrayUnion, doc, getFirestore, increment, writeBatch } from "firebase/firestore";
import { app, db } from "../../firebase";
import { IChat, IEvent } from "../../types/types";
import ChatWS from "../ChatWS";


class Firestore {
	#db = getFirestore(app);
	
	async createEvent(userId: string, event: IEvent, chat: IChat) {
		const batch = writeBatch(db)
		batch.set(doc(db, "events", event.id), event);
		batch.set(doc(db, "chats", chat.id), chat);
		batch.update(doc(db, "users", userId), {
			createdMeets: increment(1),
			activeMeets: arrayUnion(event.id),
		});
		await batch.commit();
		ChatWS.onCreateEvent(chat.id);
	}

	async deleteEvent() {

	}
}

export const FirestoreDB = new Firestore()