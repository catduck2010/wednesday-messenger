import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MessengerApiService} from '../messenger-api.service';
import {SocketService} from '../socket.service';
import {Chat} from '../models/chat';
import {User} from '../models/user';
import {GrandService} from '../grand.service';
import {NbMenuItem, NbMenuService, NbToastrService, NbWindowRef, NbWindowService} from '@nebular/theme';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ChatBlockDirective} from '../chat-block.directive';
import {ChatComponent} from '../chat/chat.component';
import {MessageEmitterService} from '../message-emitter.service';
import {Message} from '../models/message';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageEmitterService]
})
export class MainComponent implements OnInit {
  items: NbMenuItem[];
  right: any;
  text: string;
  messages: any[] = [];
  chats: Chat[] = [];
  friends: User[] = [];
  currentUser: User = null;
  private userMap: Map<string, User> = new Map();
  private chatComponentRef: ComponentRef<ChatComponent> = null;
  currentChat: Chat = null;
  container: ViewContainerRef;
  @ViewChild(ChatBlockDirective) dlHost: ChatBlockDirective;
  @ViewChild('escClose', {read: TemplateRef}) escCloseTemplate: TemplateRef<HTMLElement>;

  changePasswordMode = false;
  oldPassword = '';
  password = '';
  confirm = '';
  profileUsername = '';
  profileNickname = '';
  private profileWindowRef: NbWindowRef;


  constructor(private grand: GrandService,
              private api: MessengerApiService,
              private socketService: SocketService,
              private toastr: NbToastrService,
              private menuService: NbMenuService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private messageEmitter: MessageEmitterService,
              private windowService: NbWindowService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    const info = this.grand.getInfo();
    this.currentUser = info.currentUser;
    this.items = [
      {title: 'My Profile'},
      {title: 'Add A Friend'},
      {title: 'New Chat'},
      {title: 'Log Out'}
    ];
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
          this.grand.logOut();
        } else if (title === 'My Profile') {
          this.openProfileWindow();
        }
      });
    this.grand.socket.on('new message', (chatId: string, messageId: string) => {
      this.api.getMessage(info.sessionId, info.userId, messageId)
        .subscribe((doc) => {
          this.announce(doc);
          this.popToastr(doc.content, `From ${this.userMap.get(doc.userId).nickname}:`);
        });
    });
    this.grand.socket.on('delete', (chatId: string, messageId: string) => {
      this.announceDelete({chatId, messageId});
    });
  }

  private announce(message: Message) {
    this.messageEmitter.newMessage(message);
  }

  private announceDelete(msg: { chatId: string, messageId: string }) {
    this.messageEmitter.deleteMessage(msg);
  }

  getChatType(chat: Chat) {
    return chat.users.length <= 2 ? '' : 'Group Chat';
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
    this.chatComponentRef.instance.toastr = this.toastr;
    this.chatComponentRef.instance.title = this.getChatName(this.currentChat);
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

  getChatName(chat: Chat) {
    let str = '';
    if (chat.users.length === 1) {
      str = 'Saved Messages';
    } else if (chat.users.length === 2) {
      const users = chat.users;
      users.forEach(userId => {
        if (userId !== this.currentUser._id) {
          str = this.userMap.get(userId).nickname;
        }
      });
    } else {
      str = chat.chatName;
    }
    return str;
  }

  openProfileWindow() {
    this.resetProfileWindow();
    this.profileWindowRef = this.windowService.open(
      this.escCloseTemplate,
      {title: 'My Profile', hasBackdrop: true},
    );
  }

  private resetProfileWindow() {
    this.changePasswordMode = false;
    this.profileUsername = this.currentUser.username;
    this.profileNickname = this.currentUser.nickname;
    this.oldPassword = '';
    this.password = '';
    this.confirm = '';
  }

  getPlaceholder() {
    return this.changePasswordMode ? 'New Password' : 'Password';
  }

  changeMode() {
    this.changePasswordMode = true;
  }

  saveProfile() {
    const info = this.grand.getInfo();
    if (this.password !== this.confirm) {
      this.toastr.danger('Passwords not match');
    } else {
      const user = this.currentUser;
      if (!this.changePasswordMode) { // profile
        user.nickname = this.profileNickname;
        user.username = this.profileUsername;
        this.api.updateUserById(info.sessionId, info.userId, user, this.password, this.password)
          .subscribe((u) => {
            this.currentUser = u;
            this.toastr.success('Successfully Updated', 'Message');
            this.profileWindowRef.close();
          }, (error) => {
            this.toastr.danger(`${error}`, 'Error');
          });
      } else {
        this.api.updateUserById(info.sessionId, info.userId, this.currentUser, this.oldPassword, this.password)
          .subscribe((u) => {
            this.currentUser = u;
            this.toastr.success('Successfully Updated', 'Message');
            this.profileWindowRef.close();
          }, error => {
            this.toastr.danger(`${error}`, 'Error');
          });
      }
    }
  }

}
