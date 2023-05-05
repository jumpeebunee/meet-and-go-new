import { PropsWithChildren, createContext } from "react";

interface IChatWSOptions {
	url: string,
  userId: string;
}

export class ChatWS {
  #socket = {} as WebSocket;
	connection?: Promise<boolean> 

  constructor() {}

  async init({url, userId}: IChatWSOptions) {
    this.#socket = new WebSocket(`${url}?userId=${userId}`);
    this.connection = new Promise<boolean>((resolve, reject) => {
      this.#socket.onopen = () => {
        resolve(true);
      };
      this.#socket.onerror = () => {
        reject(false);
      };
    });
  }
}

export const ChatWSContext = createContext<ChatWS>({} as ChatWS);

export const ChatWSProvider = ({ children }: PropsWithChildren) => {
  return (
    <ChatWSContext.Provider value={new ChatWS()}>
      {children}
    </ChatWSContext.Provider>
  );
};
