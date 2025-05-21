import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../Services/Chat/chat.service';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  private chatService = inject(ChatService);

  user: string = ''; // Replace with the actual user object
  message: string = '';
  messages: { user: string, message: string }[] = [];

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.onReceiveMessage((user, message) => {
      console.log(`Received message from ${user}: ${message}`);
      this.messages.push({ user, message });
    });
  }

  send(){
    this.chatService.sendMessage(this.user, this.message);
    this.message = '';
  }
}
