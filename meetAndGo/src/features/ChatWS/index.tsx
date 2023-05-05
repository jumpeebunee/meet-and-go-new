interface IChatWSOptions {
  url: string;
  userId: string;
}

class ChatWS {
  #socket = {} as WebSocket;

  async init({ url, userId }: IChatWSOptions) {
    this.#socket = new WebSocket(`${url}?userId=${userId}`);
    await new Promise<boolean>((resolve, reject) => {
      this.#socket.onopen = () => {
        resolve(true);
      };
      this.#socket.onerror = () => {
        reject(false);
      };
    });
  }

	onMessage(callback: (ev: MessageEvent) => void) {
		this.#socket.addEventListener('message', callback)
	}
	onClose(callback: (ev: CloseEvent) => void) {
		this.#socket.addEventListener('close', callback)
	}

  async onCreateEvent(chatId: string) {
    this.#socket.send(JSON.stringify({ chatId }));
  }
}

export default new ChatWS();
