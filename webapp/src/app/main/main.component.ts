import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MessengerApiService} from '../messenger-api.service';
import {SocketService} from '../socket.service';
import {Chat} from '../models/chat';
import {User} from '../models/user';
import {GrandService} from '../grand.service';
import {NbMenuItem, NbMenuService, NbToastrService} from '@nebular/theme';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ChatBlockDirective} from "../chat-block.directive";
import {ChatComponent} from "../chat/chat.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  ifShowChat = false;
  items: NbMenuItem[];
  right: any;
  text: string;
  messages: any[] = [];
  chats: Chat[] = [];
  friends: User[] = [];
  private userMap: Map<string, User> = new Map();
  private chatComponentRef: ComponentRef<ChatComponent> = null;
  currentChat: Chat = null;
  container: ViewContainerRef;
  @ViewChild(ChatBlockDirective) dlHost: ChatBlockDirective;

  constructor(private grand: GrandService,
              private api: MessengerApiService,
              private socketService: SocketService,
              private toastr: NbToastrService,
              private menuService: NbMenuService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.items = [{title: 'Log Out'}];
    this.right = 'right';
    this.getFriends();
    this.getChats();

    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'user-context-menu'),
        map(({item: {title}}) => title),
      )
      .subscribe((title) => {
        if (title === 'Log Out') {
          // this.router.navigate('welcome').then((b) => {
          //   console.log(b);
          // });
        }
      });

  }

  getChats() {
    const info = this.grand.getInfo();
    this.api.getChatsInfo(info.userId)
      .subscribe(
        (doc) => {
          doc.forEach((chat) => {
            this.chats.push(chat);
          });
          this.chats.forEach((chat) => {
            chat.users.forEach(id => {
              if (!this.userMap.has(id)) {
                this.api.getUserById(id)
                  .subscribe((user) => {
                      this.userMap.set(user._id, user);
                    },
                    (error) => {
                      this.toastr.danger(error, `Cannot find user ${id}`);
                    }
                  );
              }
            });
          });
          console.log(doc);
          this.chats = doc;
        }
      );
  }

  getFriends() {
    const info = this.grand.getInfo();
    this.api.getFriendsInfo(info.userId)
      .subscribe(
        (doc) => {
          doc.forEach(user => {
            this.friends.push(user);
          });
          this.friends.forEach(user => {
            this.userMap.set(user._id, user);
          });
        }
      );
  }

  openChat(chat: Chat) {
    if (this.chatComponentRef !== null) {
      this.chatComponentRef.destroy();
    }
    this.currentChat = chat;
    this.chatComponentRef = this.dlHost.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(ChatComponent)
    );
    this.chatComponentRef.instance.chat = this.currentChat;
    this.chatComponentRef.instance.people = this.getPeople(this.currentChat);
  }

  private popToastr(message: string, title?: string) {
    this.toastr.primary(message, title, {duration: 3000, hasIcon: false});
  }

  getPeople(chat: Chat) {
    const people: User[] = [];
    if (chat === null) {
      return [];
    }
    chat.users.forEach(id => {
      if (this.userMap.has(id)) {
        people.push(this.userMap.get(id));
      }
    });
    return people;
  }
}
