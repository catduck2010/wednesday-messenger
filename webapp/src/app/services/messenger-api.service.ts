import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginResponse} from '../models/login-response';
import {Message} from '../models/message';
import {User} from '../models/user';
import {Chat} from '../models/chat';
import {environment} from '../../environments/environment';

const url = environment.apiUrl;

const headers = new HttpHeaders()
  .set(
    'Content-type',
    'application/json; charset=UTF-8'
  )
;

@Injectable({
  providedIn: 'root'
})
export class MessengerApiService {

  constructor(private http: HttpClient) {
  }

  // handle errors
  private static handleError(error: Response | any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // get all users from server
  getAllUsers() {
    return this.http
      .get<User[]>(url + '/users', {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // create message to server and get its id at server
  createMessage(sessionId: string, userId: string, chatId: string, type: string, message: string) {
    const timeNow = Date.now();
    return this.http
      .post<Message>(url + '/messages', {
        sessionId,
        userId,
        chatId,
        type,
        content: message,
        time: timeNow
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // get a message by using its id
  getMessage(sessionId, userId, messageId) {
    return this.http
      .post<Message>(url + '/messages/' + messageId, {
        sessionId,
        userId
      }, {headers});
  }

  // register
  createUser(username: string, password: string, nickname: string) {
    return this.http
      .post<User>(url + '/users', {
        username,
        password,
        nickname
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // create a chat (conversation/group chat)
  createChat(sessionId: string, chatName: string, userId: string, others: Array<string>) {
    const users = others;
    users.unshift(userId);
    return this.http
      .post<Chat>(url + '/chats', {
        userId,
        sessionId,
        chatName,
        users
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // login
  tryLogin(username: string, password: string) {
    return this.http
      .post<LoginResponse>(url + '/users/login', {username, password}, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // get a user by its username
  getUser(username: string) {
    return this.http
      .get<User>(url + '/users/' + username, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // get a user by its id
  getUserById(userId: string) {
    return this.http
      .get<User>(url + '/users/id/' + userId, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // update a user's profile by entering password
  updateUserById(sessionId: string, userId: string, item: User, password: string, newPassword: string) {
    return this.http
      .put<User>(url + '/users/id/' + userId, {
        userId,
        sessionId,
        username: item.username,
        nickname: item.nickname,
        password,
        newPassword,
        friendList: item.friendList,
        blockList: item.blockList,
        chatList: item.chatList
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // delete a user
  deleteUserById(sessionId: string, userId: string) {
    return this.http
      .request<{ message: string }>('delete', url + '/users/id/' + userId, {
        body: {
          sessionId,
          userId
        },
        headers
      }).pipe(catchError(MessengerApiService.handleError));
  }

  // get all messages from a chat
  getChatMessages(sessionId: string, userId: string, chatId: string) {
    return this.http
      .get<Message[]>(url + '/chats/get/' + chatId)
      .pipe(catchError(MessengerApiService.handleError));

  }

  // get chat's name & users
  getChatInfo(chatId) {
    return this.http
      .get<Chat>(url + '/chats/' + chatId, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // change chat's name & users
  updateChatById(sessionId: string, userId: string, chatId: string, item: Chat) {
    return this.http
      .put<Chat>(url + '/chats/' + chatId, {
        sessionId,
        userId,
        chatId,
        chatName: item.chatName,
        users: item.users
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // delete a chat
  deleteChatById(sessionId, userId, chatId) {
    return this.http
      .request<{ message: string }>('delete', url + '/chat/' + chatId, {
        body: {
          sessionId,
          userId
        }, headers
      }).pipe(catchError(MessengerApiService.handleError));
  }

  // get all friends of a user
  getFriendsInfo(userId) {
    return this.http
      .get<User[]>(url + '/users/id/' + userId + '/friends', {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // get all chats of a user
  getChatsInfo(userId) {
    return this.http
      .get<Chat[]>(url + '/users/id/' + userId + '/chats', {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  // delete message from server
  deleteMessageById(sessionId, userId, messageId) {
    return this.http
      .request<{ message: string }>('delete', url + '/messages/' + messageId, {
        body: {
          sessionId,
          userId
        }, headers
      }).pipe(catchError(MessengerApiService.handleError));
  }

}
