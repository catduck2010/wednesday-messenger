import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ApplicationRef
} from '@angular/core';
import {GrandService} from '../grand.service';
import {MessengerApiService} from '../messenger-api.service';
import {User} from '../models/user';
import {Message} from '../models/message';
import {Chat} from '../models/chat';
import {MessageEmitterService} from '../message-emitter.service';
import {Subscription} from 'rxjs';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges, OnDestroy {

  @Input() chat: Chat = null;
  @Input() people: User[] = [];
  @Input() toastr: NbToastrService;
  messages: any[] = [];
  chatId: string;
  userId: string;
  private userMap: Map<string, User>;
  private messageMap: Map<string, object>;
  private subscription: Subscription;

  constructor(private grand: GrandService,
              private api: MessengerApiService,
              private messageEmitter: MessageEmitterService) {
    this.subscription = messageEmitter.messageAnnounced
      .subscribe(message => {
        if (message !== null && message !== undefined && message.type !== 'done') {
          console.log(message);
          if (message.chatId === this.chatId) {
            setInterval(() => {
              this.pushNewMessage(message);
              // this.appRef.tick();
            }, 500);
          }
        }
      });
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.chatId = '';
    this.subscription.unsubscribe();
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
    this.messages.push({
      text: event.message,
      date: new Date(),
      type: 'text',
      reply: true,
      user: {
        name: this.userMap.get(info.userId).nickname
      }
    });
    // this.appRef.tick();
    this.api.createMessage(info.sessionId, info.userId, this.chatId, 'text', event.message)
      .subscribe((message) => {
        // userId, sessionId, chatId, messageId
        this.grand.socket.emit('message', info.userId, info.sessionId, this.chatId, message._id);
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
        text: message.content,
        date: new Date(message.time),
        type: message.type,
        reply: message.userId === this.userId,
        user: {
          name: this.userMap.get(message.userId).nickname
        }
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
}
