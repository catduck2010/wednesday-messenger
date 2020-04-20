import {Component, OnInit} from '@angular/core';
import {Chat} from '../models/chat';
import {GrandService} from '../grand.service';
import {MessengerApiService} from '../messenger-api.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  chats: Chat[];

  constructor(private grand: GrandService, private api: MessengerApiService) {
  }

  ngOnInit(): void {
    this.getChats();
  }

  getChats() {
    const info = this.grand.getInfo();
    this.api.getChatsInfo(info.userId)
      .subscribe(
        (doc) => {
          this.chats = doc;
        }
      );
  }

}
