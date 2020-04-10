import {Component, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';

  ngOnInit(): void {
    const socket = socketIo('http://localhost:777');
    socket.userId = 'c5fa5c56-b37a-c838-edf3-6e498fc1fbe8';
    socket.on('message', data => console.log(data));
  }

}
