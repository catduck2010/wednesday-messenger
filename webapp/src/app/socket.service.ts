import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;
  private url = environment.apiUrl + '?user=';

  constructor() {
  }

  connect(userId: string,
          newMessageHandler: (chatId: string, messageId: string) => void,
          sentHandler: (message: string) => void,
          updateHandler: (chatId: string, messageId: string) => void,
          deleteHandler: (chatId: string, messageId: string) => void,
          sessionExpireHandler: (message: string) => void) {
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
    this.socket.on('update', updateHandler);
    this.socket.on('delete', deleteHandler);
    this.socket.on('logout', (message) => {
      this.disconnect();
      sessionExpireHandler(message);
    });
    return this.socket;
  }

  legacyConnect(userId) {
    const uri = this.url + userId;
    this.socket = socketIo.connect(uri);
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

  updateMessage(userId: string, sessionId: string, chatId: string, messageId: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('update message', userId, sessionId, messageId);
    }
  }

  deleteMessage(userId: string, sessionId: string, chatId: string, messageId: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('delete message', userId, sessionId, messageId);
    }
  }

  disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket = null;
  }

}
