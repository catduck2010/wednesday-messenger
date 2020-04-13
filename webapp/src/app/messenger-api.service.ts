import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
    return this.http
      .post(url + '/message', {
        sessionId,
        userId,
        chatId,
        type,
        content: message,
        time: Date.now()
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  createUser(username: string, password: string, nickname: string) {
    return this.http
      .post(url + '/register', {
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
      .post(url + '/chat', {
        sessionId,
        chatName,
        users
      }, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

  tryLogin(username: string, password: string) {
    return this.http
      .post(url + '/login', {username, password}, {headers})
      .pipe(catchError(MessengerApiService.handleError));
  }

}
