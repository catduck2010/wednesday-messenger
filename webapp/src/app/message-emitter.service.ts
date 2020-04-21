import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from './models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageEmitterService {
  private messageAnnouncedSource = new Subject<Message>();

  messageAnnounced$ = this.messageAnnouncedSource.asObservable();

  newMessage(message: Message) {
    this.messageAnnouncedSource.next(message);
  }
}
