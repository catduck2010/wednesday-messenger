import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {GrandService} from '../../services/grand.service';
import {MessengerApiService} from '../../services/messenger-api.service';
import {User} from '../../models/user';
import {Message} from '../../models/message';
import {Chat} from '../../models/chat';
import {MessageEmitterService} from '../../services/message-emitter.service';
import {Subscription} from 'rxjs';
import {NbMenuService, NbToastrService} from '@nebular/theme';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private grand: GrandService,
              private api: MessengerApiService,
              private menuService: NbMenuService,
              private messageEmitter: MessageEmitterService) {
    this.subscription = messageEmitter.messageAnnounced
      .subscribe(message => {
        if (message !== null && message !== undefined && message.type !== 'done') {
          console.log(message);
          if (message.chatId === this.chatId) {
            this.pushNewMessage(message);
            // this.appRef.tick();
          }
        }
      });
    this.deleteSubscription = messageEmitter.messageDeleteSource
      .subscribe(msg => {
        // console.log('To delete:', msg.messageId, this.messageMap.has(msg.messageId));

        if (this.chatId === msg.chatId) {
          this.messages.forEach(m => {
            if (m.id === msg.messageId) {
              m.deleted = true;
            }
          });
        }
      });
  }

  @Input() chat: Chat = null;
  @Input() people: User[] = [];
  @Input() toastr: NbToastrService;
  @Input() title: string;
  messages: any[] = [];
  chatId: string;
  userId: string;
  private selectedMsg: any;
  private userMap: Map<string, User>;
  private messageMap: Map<string, object>;
  private subscription: Subscription;
  private menuSubscription: Subscription;
  private deleteSubscription: Subscription;
  items: any;


  private deleteMessage(msg: any) {
    const info = this.grand.getInfo();
    if (confirm(`Are you sure to delete this message: ${msg.text}`)) {
      this.api.deleteMessageById(info.sessionId, info.userId, msg.id)
        .subscribe(() => {
          this.toastr.success('Message Deleted.');
          this.grand.socket.emit('delete message', info.userId, info.sessionId, this.chat._id, msg.id);
          msg.deleted = true;
        }, () => {
          this.toastr.danger('Error on deleting this message.');
        });
    }
  }

  ngOnInit(): void {
    this.items = [
      {title: 'Delete'}
    ];
    this.init();
    this.menuSubscription = this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'msg-context-menu'),
        map(({item: {title}}) => title),
      )
      .subscribe((title) => {
        if (title === 'Delete') {
          // this.router.navigate('welcome').then((b) => {
          //   console.log(b);
          // });
          this.deleteMessage(this.selectedMsg);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.chatId = '';
    this.subscription.unsubscribe();
    this.menuSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.messages = [];
  }

  init() {
    if (this.chat !== null) {
      const info = this.grand.getInfo();
      this.chatId = this.chat._id;
      this.userId = info.userId;
      const peopleId = this.chat.users;
      // this.people = this.chat.users;
      this.userMap = new Map<string, User>();
      this.messageMap = new Map<string, Message>();
      this.people.forEach(person => {
        this.userMap.set(person._id, person);
      });
      this.getAllMessages();
    }
    console.log(this.chat);
  }

  reset() {
    this.messages = [];
  }

  create(event: { message: string; files: File[] }) {
    const info = this.grand.getInfo();
    // this.messages.push({
    //   text: event.message,
    //   date: new Date(),
    //   type: 'text',
    //   reply: true,
    //   user: {
    //     name: this.userMap.get(info.userId).nickname
    //   }
    // });
    // this.appRef.tick();
    this.api.createMessage(info.sessionId, info.userId, this.chatId, 'text', event.message)
      .subscribe((message) => {
        // userId, sessionId, chatId, messageId
        this.grand.socket.emit('message', info.userId, info.sessionId, this.chatId, message._id);
        this.messages.push({
          id: message._id,
          text: message.content,
          date: new Date(message.time),
          type: message.type,
          reply: message.userId === info.userId,
          user: {
            name: this.userMap.get(info.userId).nickname
          },
          deleted: false
        });
      });
  }

  getAllMessages() {
    const info = this.grand.getInfo();
    this.api.getChatMessages(info.sessionId, info.userId, this.chatId)
      .subscribe(
        (doc) => {
          // this.toastr.primary('Loading Messages', 'Alert');
          doc.forEach((message) => {
            this.messageHandler(message);
          });
          // this.toastr.primary('Messages loaded', 'Alert');
          // this.appRef.tick();
        }
      );
  }

  messageHandler(message: Message) {
    const item = this.messageConverter(message);
    this.messages.push(item);
  }

  messageConverter(message: Message) {
    if (!this.messageMap.has(message._id)) {
      const item = {
        id: message._id,
        text: message.content,
        date: new Date(message.time),
        type: message.type,
        reply: message.userId === this.userId,
        user: {
          name: this.userMap.get(message.userId).nickname
        },
        deleted: false
      };
      this.messageMap.set(message._id, item);
      return item;
    }
    return undefined;
  }

  private pushNewMessage(message: Message) {
    const item = this.messageConverter(message);
    if (item !== undefined && item !== null) {
      this.messages.push(item);
    }
  }

  selectMsg(msg: any) {
    this.selectedMsg = msg;
    console.log(msg);
  }
}
