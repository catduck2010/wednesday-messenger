import {Injectable} from '@angular/core';
import {MessengerApiService} from './messenger-api.service';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class GrandService {
  private loggedIn = false;
  private userId: string;
  private sessionId: string;

  constructor(private api: MessengerApiService, private skt: SocketService) {
  }

  login(username: string, password: string) {
    this.api.tryLogin(username, password)
      .subscribe(
        (doc) => {
          this.userId = doc.userId;
          this.sessionId = doc.sessionId;
        },
        () => {
          alert('Incorrect username or password');
        },
        () => {

        });
  }


}
