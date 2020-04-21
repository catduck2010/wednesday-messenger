import {Component, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private title: Title) {
  }

  ngOnInit(): void {
    // const socket = socketIo('http://localhost:777');
    // socket.on('message', data => console.log(data));
    this.title.setTitle('Wednesday Messenger');
  }

}
