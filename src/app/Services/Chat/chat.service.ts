import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection | undefined;
  private readonly baseUrl: string = 'https://localhost:5153/chat';

  public messages$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  public startConnection(userToken: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7021/chatHub', {
        accessTokenFactory: () => userToken,
      })
      .withAutomaticReconnect()
      .build();

      this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  public sendMessage(reciverId: string, message: string) { //user will be an object 
    this.hubConnection?.invoke('SendMessage', reciverId, message)
    .catch(err => console.log(err));
  }

  // getMessagesWith(userId: string) {
  //   return this.http.get<any[]>(`${this.baseUrl}/messages/${userId}`);
  // }

  getInstructors() {
    return this.http.get<any[]>(`${this.baseUrl}/instructors`);
  }

  public onReceiveMessage(callback: (user: string, message: string) => void) {
    this.hubConnection?.on('ReceiveMessage', callback);

  }
}
