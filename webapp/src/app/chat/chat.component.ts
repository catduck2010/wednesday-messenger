import {Component, Input, OnInit} from '@angular/core';
import {GrandService} from '../grand.service';
import {MessengerApiService} from '../messenger-api.service';
import {User} from '../models/user';
import {Message} from '../models/message';
import {Chat} from '../models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat: Chat;
  people: User[];
  messages: any[];
  chatId: string;
  private userMap: Map<string, User>;
  private messageMap: Map<string, object>;

  constructor(private grand: GrandService, private api: MessengerApiService) {
  }

  ngOnInit(): void {
    this.chatId = this.chat._id;
    // this.people = this.chat.users;
    this.userMap = new Map<string, User>();
    this.messageMap = new Map<string, Message>();
    this.people.forEach(person => {
      this.userMap.set(person._id, person);
    });
    this.getAllMessages();
  }

  create(event: { message: string; files: File[] }) {
    const info = this.grand.getInfo();
    this.api.createMessage(info.sessionId, info.userId, this.chatId, 'text', event.message)
      .subscribe((message) => {
        this.messageHandler(message);
        // userId, sessionId, chatId, messageId
        this.grand.socket.emit('message', info.userId, info.sessionId, this.chatId, message._id);
      });
  }

  getAllMessages() {
    const info = this.grand.getInfo();
    this.api.getChatMessages(info.sessionId, info.userId, this.chatId)
      .subscribe(
        (doc) => {
          doc.forEach((message) => {
            this.messageHandler(message);
          });
        }
      );
  }

  messageHandler(message: Message) {
    const item = {
      id: message._id,
      text: message.content,
      date: new Date(message.time),
      files: null,
      type: message.type,
      reply: false,
      user: {
        name: this.userMap.get(message.userId).nickname
      }
    };
    this.messageMap.set(message._id, item);
    this.messages.push(item);
  }
}