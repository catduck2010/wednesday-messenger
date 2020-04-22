// define objects
export interface Message {
  _id: string;
  userId: string;
  chatId: string;
  type: string;
  content: string;
  time: string | Date; // convert this with new Date(<innerString>)
}
