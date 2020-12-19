import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MessengerApiService} from '../../services/messenger-api.service';
import {SocketService} from '../../services/socket.service';
import {Chat} from '../../models/chat';
import {User} from '../../models/user';
import {GrandService} from '../../services/grand.service';
import {NbMenuItem, NbMenuService, NbToastrService, NbWindowRef, NbWindowService} from '@nebular/theme';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ChatBlockDirective} from '../../chat-block.directive';
import {ChatComponent} from '../chat/chat.component';
import {MessageEmitterService} from '../../services/message-emitter.service';
import {Message} from '../../models/message';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageEmitterService]
})
export class MainComponent implements OnInit {
  items: NbMenuItem[];
  userMenu: NbMenuItem[];
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
  @ViewChild('addChat', {read: TemplateRef}) addChatTemplate: TemplateRef<HTMLElement>;

  changePasswordMode = false;
  oldPassword = '';
  password = '';
  confirm = '';
  profileUsername = '';
  profileNickname = '';
  newChatName = '';
  private profileWindowRef: NbWindowRef;
  private createChatWindowRef: NbWindowRef;
  private selectedUser: User;
  private checkedUser: User[] = [];
  userList: User[] = [];

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
    // context menu items
    this.items = [
      {title: 'My Profile'},
      {title: 'New Chat'},
      {title: 'Log Out'}
    ];
    this.userMenu = [
      {title: 'Send Message'}
    ];
    this.right = 'right';
    this.getFriends();
    this.getChats();
    // when click a item from context menu
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'profile-context-menu'),
        map(({item: {title}}) => title),
      )
      .subscribe((title) => {
        if (title === 'Log Out') {
          this.grand.logOut();
        } else if (title === 'My Profile') {
          this.openProfileWindow();
        } else if (title === 'New Chat') {
          this.openCreateChatWindow();
        }

        // } else if (title === 'Add A Friend') {
        //
        // }
      });
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'users-context-menu'),
        map(({item: {title}}) => title),
      )
      .subscribe((title) => {
        // if (title === 'Delete') {
        //   if (confirm(`Are you sure to delete friend ${this.selectedUser.nickname}?`)) {
        //
        //   }
        // } else
        if (title === 'Send Message') {
          // this.openProfileWindow();
          this.createConversation(this.selectedUser);
        }
      });

    // socketIo: when getting a new message
    this.grand.socket.on('new message', (chatId: string, messageId: string) => {
      this.api.getMessage(info.sessionId, info.userId, messageId)
        .subscribe((doc) => {
          this.announce(doc);
          this.popToastr(doc.content, `From ${this.userMap.get(doc.userId).nickname}:`);
          let flag = false;
          this.chats.forEach((chat) => {
            if (chat.id === chatId) {
              flag = true;
            }
          });
          if (!flag) {
            this.getFriends();
            this.getChats();
          }
        });
    });
    // socketIo: when receive a request to delete a message
    this.grand.socket.on('delete', (chatId: string, messageId: string) => {
      this.announceDelete({chatId, messageId});
    });
  }

  // send to message emitter service and new message will show in chat UI
  private announce(message: Message) {
    this.messageEmitter.newMessage(message);
  }

  private announceDelete(msg: { chatId: string, messageId: string }) {
    this.messageEmitter.deleteMessage(msg);
  }

  // show text of type of a chat
  getChatType(chat: Chat) {
    return chat.users.length <= 2 ? '' : 'Group Chat';
  }

  // get chats in current user's chatList
  // and manipulate ungetted users to hashmap
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
                      this.userMap.set(user.id, user);
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

  // get users from current user's friend list
  getFriends() {
    const info = this.grand.getInfo();
    this.api.getFriendsInfo(info.userId)
      .subscribe(
        (doc) => {
          doc.forEach(user => {
            this.friends.push(user);
          });
          this.friends.forEach(user => {
            this.userMap.set(user.id, user);
          });
        }
      );
  }

  // toggle a chat ui
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

  // pop notifications
  private popToastr(message: string, title?: string) {
    this.toastr.primary(message, title, {duration: 3000, hasIcon: false});
  }

  // get users from friend list in type of User
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

  // determine the name showing at sidebar
  getChatName(chat: Chat) {
    let str = '';
    if (chat.users.length === 1) {
      str = 'Saved Messages';
    } else if (chat.users.length === 2) {
      const users = chat.users;
      users.forEach(userId => {
        if (userId !== this.currentUser.id) {
          str = this.userMap.get(userId).nickname;
        }
      });
    } else {
      str = chat.chatName;
    }
    return str;
  }

  // open profile settings window
  openProfileWindow() {
    this.resetProfileWindow();
    this.profileWindowRef = this.windowService.open(
      this.escCloseTemplate,
      {title: 'My Profile', hasBackdrop: true},
    );
  }

  // reset values
  private resetProfileWindow() {
    this.changePasswordMode = false;
    this.profileUsername = this.currentUser.username;
    this.profileNickname = this.currentUser.nickname;
    this.oldPassword = '';
    this.password = '';
    this.confirm = '';
  }

  // open a window that allow user to create a group chat
  openCreateChatWindow() {
    this.checkedUser = [];
    this.newChatName = '';
    this.api.getAllUsers()
      .subscribe((users) => {
        this.userList = users;
        this.createChatWindowRef = this.windowService.open(
          this.addChatTemplate,
          {title: 'Create Chat', hasBackdrop: true}
        );
      }, (error) => {
        this.toastr.danger(`${error}`, 'Error');
      });
  }


  getPlaceholder() {
    return this.changePasswordMode ? 'New Password' : 'Password';
  }

  changeMode() {
    this.changePasswordMode = true;
  }

  // when clicking save button
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
        if (this.password === this.oldPassword) {
          this.toastr.warning(`New password is the same as old. `, 'Alert');
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

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  // create a chat
  createChat(chatName: string, users: Array<string>) {
    const info = this.grand.getInfo();
    this.api.createChat(info.sessionId, chatName, info.userId, users)
      .subscribe((chat) => {
        this.chats.push(chat);
        this.openChat(chat);
        this.toastr.success(`Chat is created!`, 'Success');
        if (this.createChatWindowRef !== null) {
          this.createChatWindowRef.close();
        }
      }, error => {
        this.toastr.danger(`${error}`, 'Error');
      });
  }

  // create a chat if there's no chatroom between two users
  // if they've already have a chatroom, this function would show that
  createConversation(friend: User) {
    const info = this.grand.getInfo();
    let flag = false;
    this.chats.every((chat) => {
      if (chat.users.indexOf(friend.id) !== -1 &&
        chat.users.indexOf(info.userId) !== -1 &&
        chat.users.length === 2) {
        this.openChat(chat);
        flag = true;
        return false; // stop loop
      }
      return true;
    });
    if (!flag) {
      this.createChat('Chat', [friend.id]);
    }
  }

  toggleUser(u: User, checked: boolean) {
    if (checked) {
      this.checkedUser.push(u);
    } else {
      const index = this.checkedUser.indexOf(u);
      if (index > -1) {
        this.checkedUser.splice(index, 1);
      }
    }
  }

  checkUserCounts() {
    return this.checkedUser.length < 2;
  }

  checkIfCurrentUser(user: User) {
    return user.id === this.grand.getInfo().userId;
  }

  // when click create button at create chat window
  createGroupChat() {
    if (this.newChatName !== '') {
      const userIds: string[] = [];
      this.checkedUser.forEach(user => {
        userIds.push(user.id);
      });
      this.createChat(this.newChatName, userIds);
    } else {
      this.toastr.warning(`Please enter 'Chat Name'!`, 'Alert');
    }
  }
}
