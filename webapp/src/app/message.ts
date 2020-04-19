export interface Message {
  _id: string;
  userId: string;
  chatId: string;
  type: string;
  content: string;
  time: Date;
}
