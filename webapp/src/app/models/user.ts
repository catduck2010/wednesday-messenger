// define objects
export interface User {
  id: string;
  username: string;
  nickname: string;
  password: string;
  friendList: Array<string>;
  blockList: Array<string>;
  chatList: Array<string>;
}
