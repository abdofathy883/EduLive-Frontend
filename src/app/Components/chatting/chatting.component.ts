import { Component } from '@angular/core';
import { ChatService } from '../../Services/Chat/chat.service';

@Component({
  selector: 'app-chatting',
  imports: [],
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.css'
})
export class ChattingComponent {

  constructor(private chatService: ChatService) { }
}
