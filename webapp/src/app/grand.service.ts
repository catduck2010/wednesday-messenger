import {Injectable} from '@angular/core';
import {MessengerApiService} from './messenger-api.service';
import {SocketService} from './socket.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GrandService {
  loggedIn = false;
  private userId: string;
  private sessionId: string;
  socket: SocketIOClient.Socket;

  constructor(private router: Router, private api: MessengerApiService, private skt: SocketService) {
  }

  login(username: string, password: string) {
    this.api.tryLogin(username, password)
      .subscribe(
        (doc) => {
          this.userId = doc.userId;
          this.sessionId = doc.sessionId;
          this.loggedIn = true;
          this.socket = this.skt.legacyConnect(this.userId);
          this.router.navigate(['index']).then(b => console.log(b));
        },
        () => {
          alert('Incorrect username or password');
        },
        () => {

        });
  }

  getInfo() {
    return this.loggedIn ? {
      userId: this.userId,
      sessionId: this.sessionId
    } : {
      userId: null,
      sessionId: null
    };
  }


}
