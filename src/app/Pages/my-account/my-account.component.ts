import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { InstructorAccountComponent } from '../instructor-account/instructor-account.component';
import { StudentAccountComponent } from '../student-account/student-account.component';

@Component({
  selector: 'app-my-account',
  imports: [InstructorAccountComponent, StudentAccountComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent {
  currentUser: any = null;
  isApproved: boolean = false;
  currentUserId: string = '';

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.LogOut();
  }
}
