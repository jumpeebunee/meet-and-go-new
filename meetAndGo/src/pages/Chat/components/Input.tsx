import { nanoid } from "@reduxjs/toolkit";
import {
  arrayUnion,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { db } from "../../../firebase";
import { IMessage } from "../../../types/types";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  userId: string;
  chatId: string;
}

const Input = ({ userId, chatId, ...props }: InputProps) => {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    try {
      const messageId = nanoid();
      const messageDoc: IMessage = {
        id: messageId,
        body: text,
        type: "text",
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        createdById: userId,
      };
      const transResp = await runTransaction(db, async (transaction) => {
        transaction.set(doc(db, "messages", messageId), messageDoc);
        transaction.update(doc(db, "chats", chatId), {
          messageIds: arrayUnion(messageId),
        });
      });
      console.log("message sent", transResp);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    sendMessage();
  };

  return (
    <div className="inputWrapper">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        {...props}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default Input;
