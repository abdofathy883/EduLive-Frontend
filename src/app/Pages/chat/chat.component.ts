    import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../Services/Chat/chat.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  instructors = [
    { id: 'instructor1', name: 'د. أحمد حسين', course: 'ASP.NET Core' },
    { id: 'instructor2', name: 'م. سارة علي', course: 'Angular متقدم' },
    // add dynamically in real case
  ];

  selectedInstructor: any = null;
  currentUser: any = 'student1'; // Replace with actual current user
  userRole: string = '';

  message: string = '';
  messageMap: { [key: string]: { user: string; message: string }[] } = {};
  
  constructor(private chatService: ChatService, private authService: AuthService) { }
  ngOnInit(): void {
    // this.currentUser = this.authService.currentUser$.subscribe((user) => {
    //   this.currentUser = user;
    // });


    // if (
    //   Array.isArray(this.currentUser.roles) &&
    //   this.currentUser.roles.length > 0
    // ) {
    //   this.userRole = this.currentUser.roles[0];
    // }

    this.chatService.startConnection(this.currentUser);

    this.chatService.onReceiveMessage((sender, message) => {
      if (!this.messageMap[sender]) this.messageMap[sender] = [];
      this.messageMap[sender].push({ user: sender, message });
    });
  }

  selectInstructor(instructor: any) {
    this.selectedInstructor = instructor;
    if (!this.messageMap[instructor.id]) this.messageMap[instructor.id] = [];
  }

  get currentMessages() {
    if (!this.selectedInstructor) return [];
    return this.messageMap[this.selectedInstructor.id] || [];
  }

  // send(){
  //   this.chatService.sendMessage(this.currentUser, this.message);
  //   this.message = '';
  // }

  send() {
    if (!this.selectedInstructor || !this.message.trim()) return;

    const recipientId = this.selectedInstructor.id;
    this.chatService.sendMessage(recipientId, this.message);

    // Add to local messages
    if (!this.messageMap[recipientId]) this.messageMap[recipientId] = [];
    this.messageMap[recipientId].push({
      user: this.currentUser,
      message: this.message,
    });

    this.message = '';
  }
}
