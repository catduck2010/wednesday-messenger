import {Component, OnInit} from '@angular/core';
import {MessengerApiService} from '../messenger-api.service';
import {SocketService} from '../socket.service';
import {Chat} from '../models/chat';
import {User} from '../models/user';
import {GrandService} from '../grand.service';
import {NbMenuItem, NbMenuService, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items: NbMenuItem[];
  right: any;
  text: string;
  messages: any[];
  chats: Chat[];
  friends: User[];
  private currentChat: Chat = null;

  constructor(private grand: GrandService,
              private api: MessengerApiService,
              private socketService: SocketService,
              private toastr: NbToastrService,
              private menuService: NbMenuService
  ) {
  }

  ngOnInit(): void {
    this.items = [{title: 'Log Out'}];
    this.right = 'right';
    this.getChats();
    this.getFriends();
    this.menuService.onItemClick()
      .subscribe(() => {
        this.popToastr('Heoo');
      });

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

  getFriends() {
    const info = this.grand.getInfo();
    this.api.getFriendsInfo(info.userId)
      .subscribe(
        (doc) => {
          this.friends = doc;
        }
      );
  }

  openChat(chat: Chat) {
    this.popToastr('Not supported yet.', 'Message');
  }

  private popToastr(message: string, title?: string) {
    this.toastr.primary(message, title, {duration: 3000, hasIcon: false});
  }
}
