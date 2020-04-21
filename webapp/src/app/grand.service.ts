import {Injectable} from '@angular/core';
import {MessengerApiService} from './messenger-api.service';
import {SocketService} from './socket.service';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class GrandService {
  loggedIn = false;
  private userId: string;
  private sessionId: string;
  socket: SocketIOClient.Socket;

  constructor(private router: Router,
              private api: MessengerApiService,
              private skt: SocketService,
              private toastr: NbToastrService) {
  }

  login(username: string, password: string, toastrService: NbToastrService) {
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
          // alert('Incorrect username or password');
          toastrService.danger('Incorrect username or password', 'Error');
        },
        () => {

        });
  }

  logOut() {
    if (this.loggedIn) {
      this.skt.disconnect();
    }
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
