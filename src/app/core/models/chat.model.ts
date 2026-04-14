export interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export interface Chat {
  name: string;
  messages: Message[];
}
