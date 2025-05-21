import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection | undefined;

  constructor() { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7021/chat')
      .build();

      this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public sendMessage(user: string, message: string) { //user will be an object 
    this.hubConnection?.invoke('SendMessage', user, message)
    .catch(err => console.log(err));
  }

  public onReceiveMessage(callback: (user: string, message: string) => void) {
    this.hubConnection?.on('ReceiveMessage', callback);

  }
}
