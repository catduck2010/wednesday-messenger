import {Component, OnInit} from '@angular/core';
import {MessengerApiService} from '../messenger-api.service';
import * as socketIo from 'socket.io-client';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-test-block',
  templateUrl: './test-block.component.html',
  styleUrls: ['./test-block.component.scss']
})
export class TestBlockComponent implements OnInit {
  items: any;
  right: any;
  text: string;

  constructor(private api: MessengerApiService, private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.items = [{title: 'Log Out'}];
    this.right = 'right';
    this.api.tryLogin('zawarudo', 'zawarudo')
      .subscribe((doc) => {
        const obj = {
          userId: doc.userId,
          sessionId: doc.sessionId
        };
        if (obj.userId === null || obj.sessionId === null) {

        } else {
          console.log(obj);
          const socket = this.socketService.legacyConnect(obj.userId);
          socket.on('success', (message) => {
            console.log(message);
            this.api.createMessage(obj.sessionId, obj.userId, '3844e9c2-0619-9f59-7517-ba443d0b1520', 'text', 'Hello World')
              .subscribe((data) => {
                console.log(data);
              });
          });
        }

        // console.log(doc);
        // const socket = socketIo('http://localhost:777');// localhost:777?user={userId}
        // socket.on('message', data => console.log(data));
        // socket.emit('login', doc.userId, doc.sessionId);
        // const socket = socketIo('http://localhost:777');
        // socket.emit('login', '6ecf83a8-60c9-a9e3-2916-af2c9f57d87f', sessionId);
        // socket.on('message', data => console.log(data));
      });
  }

}
