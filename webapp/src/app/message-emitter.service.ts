import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from './models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageEmitterService {
  private messageAnnouncedSource = new Subject<Message>();

  messageAnnounced = this.messageAnnouncedSource;

  newMessage(message: Message) {
    this.messageAnnouncedSource.next(message);
    this.messageAnnouncedSource.next({
      _id: '',
      chatId: '',
      content: '',
      time: new Date(),
      userId: '',
      type: 'done'
    });
  }
}
