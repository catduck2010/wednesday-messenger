import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;
  private url = 'http://localhost:777?user=';

  constructor() {
  }

  connect(userId: string,
          newMessageHandler: (chatId: string, messageId: string) => void,
          sentHandler: (message: string) => void) {
    const uri = this.url + userId;
    this.socket = socketIo.connect(uri);
    this.socket.on('success', (doc: string) => {
      console.log(doc);
    });
    this.socket.on('error_message', (doc: string) => {
      this.disconnect();
      console.log('Login failed. Message:', doc);
    });
    this.socket.on('new message', newMessageHandler);
    this.socket.on('sent', sentHandler);
    return this.socket;
  }

  setEventHandler(event: string, handler: any) { // handler: need a function
    if (this.socket && this.socket.connected) {
      this.socket.on(event, handler);
    }
  }

  sendMessage(userId: string, sessionId: string, chatId: string, messageId: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('message', userId, sessionId, chatId, messageId);
    }
  }

  disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
  
}
