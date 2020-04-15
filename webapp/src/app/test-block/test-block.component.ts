import {Component, OnInit} from '@angular/core';
import {MessengerApiService} from '../messenger-api.service';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-test-block',
  templateUrl: './test-block.component.html',
  styleUrls: ['./test-block.component.scss']
})
export class TestBlockComponent implements OnInit {

  constructor(private api: MessengerApiService) {
  }

  ngOnInit(): void {
    this.api.tryLogin('zawarudo', 'zawarudo')
      .subscribe((doc) => {

        console.log(doc);
        const socket = socketIo('http://localhost:777');// localhost:777?user=userId
        socket.on('message', data => console.log(data));
        socket.emit('login', doc.userId, doc.sessionId);
        // const socket = socketIo('http://localhost:777');
        // socket.emit('login', '6ecf83a8-60c9-a9e3-2916-af2c9f57d87f', sessionId);
        // socket.on('message', data => console.log(data));
      });
  }

}
