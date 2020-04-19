import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginResponse} from './models/login-response';
import {Message} from './models/message';
import {User} from './models/user';
import {Chat} from './models/chat';

const url = 'http://localhost:777';
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

  getMessage(sessionId, userId, messageId) {
    return this.http
      .post<Message>(url + '/messages/' + messageId, {
        sessionId,
        userId
      });
  }

  createUser(username: string, password: string, nickname: string) {
    return this.http
      .post<User>(url + '/users', {
        username,
        password,
        nickname
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  createChat(sessionId: string, chatName: string, userId: string, others: Array<string>) {
    const users = others;
    users.unshift(userId);
    return this.http
      .post<Chat>(url + '/chats', {
        sessionId,
        chatName,
        users
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  tryLogin(username: string, password: string) {
    return this.http
      .post<LoginResponse>(url + '/users/login', {username, password}, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  getUser(username: string) {
    return this.http
      .get<User>(url + '/users/' + username, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  getUserById(userId: string) {
    return this.http
      .get<User>(url + '/users/id/' + userId, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  updateUserById(sessionId: string, userId: string, item: User, password: string) {
    return this.http
      .put<User>(url + '/users/id/' + userId, {
        userId,
        sessionId,
        username: item.username,
        nickname: item.nickname,
        password,
        friendList: item.friendList,
        blockList: item.blockList,
        chatList: item.chatList
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  deleteUserById(sessionId: string, userId: string) {
    return this.http
      .request<JSON>('delete', url + '/users/id/' + userId, {
        body: {
          sessionId,
          userId
        },
        headers
      }).pipe(catchError(MessengerApiService.handleError));
  }

  getChatMessages(sessionId: string, userId: string, chatId: string) {
    return this.http
      .post(url + '/chats/' + chatId, {
        sessionId,
        userId
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));

  }

  getChatInfo(chatId) {
    return this.http
      .get(url + '/chats/' + chatId, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  updateChatById(sessionId: string, userId: string, chatId: string, item: Chat) {
    return this.http
      .put(url + '/chats/' + chatId, {
        sessionId,
        userId,
        chatId,
        chatName: item.chatName,
        users: item.users
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  deleteChatById(sessionId, userId, chatId) {
    return this.http
      .request('delete', url + '/chat/' + chatId, {
        body: {
          sessionId,
          userId
        }, headers
      }).pipe(catchError(MessengerApiService.handleError));
  }

}
