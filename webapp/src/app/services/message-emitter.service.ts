import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
// a service that subscribes the messages that server sent to the client
// through socketIo
export class MessageEmitterService {
  private messageAnnouncedSource = new Subject<Message>();
  messageDeleteSource = new Subject<{ chatId: string, messageId: string }>();

  messageAnnounced = this.messageAnnouncedSource;

  newMessage(message: Message) {
    this.messageAnnouncedSource.next(message);
    this.messageAnnouncedSource.next({
      id: '',
      chatId: '',
      content: '',
      time: new Date(),
      userId: '',
      type: 'done'
    });
  }

  deleteMessage(msg: { chatId: string, messageId: string }) {
    this.messageDeleteSource.next(msg);
  }
}
