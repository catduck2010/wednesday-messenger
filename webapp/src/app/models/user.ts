export interface User {
  _id: string;
  username: string;
  nickname: string;
  password: string;
  friendList: Array<string>;
  blockList: Array<string>;
  chatList: Array<string>;
}
