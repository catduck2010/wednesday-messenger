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
    this.title.setTitle('Wednesday Messenger'); // change title
  }

}
