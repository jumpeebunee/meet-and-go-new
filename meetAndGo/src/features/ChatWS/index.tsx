import { IMessage } from "../../types/types";
import { IRequest } from "./types";

export const BASE_WS_URL = "wss://meet-and-go-server.onrender.com";
// export const BASE_WS_URL = "ws://localhost:7171";

interface IChatWSOptions {
  url: string;
  userId: string;
}

class ChatWS {
  socket = {} as WebSocket;

  async init({ url, userId }: IChatWSOptions) {
    this.socket = new WebSocket(`${url}?userId=${userId}`);
    await new Promise<boolean>((resolve, reject) => {
      this.socket.onopen = () => {
        resolve(true);
      };
      this.socket.onerror = () => {
        reject(false);
      };
    });
  }
  sendMessage(message: IRequest) {
    this.socket.send(JSON.stringify(message));
  }

  async onCreateEvent(chatId: string) {
    this.sendMessage({ type: "event:create", body: { chatId } });
  }
  async onEventEnter(chatId: string) {
    this.sendMessage({ type: "event:enter", body: { chatId } });
  }
  async onEventLeave(chatId: string) {
    this.sendMessage({ type: "event:leave", body: { chatId } });
  }
  async onEventDelete(chatId: string) {
    this.sendMessage({ type: "event:delete", body: { chatId } });
  }
  async onSendMessage(message: IMessage) {
    this.sendMessage({ type: "message:send", body: message });
  }
}

export default new ChatWS();
