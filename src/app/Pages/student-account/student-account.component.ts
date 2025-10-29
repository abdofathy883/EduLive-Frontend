import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { CourseGridComponent } from "../../Components/course-grid/course-grid.component";
import { LessonReportComponent } from "../../Components/lesson-report/lesson-report.component";
import { AllLessonsComponent } from "../../Components/all-lessons/all-lessons.component";
import { ChatComponent } from "../chat/chat.component";
import { UpdateUserComponent } from "../update-user/update-user.component";

@Component({
  selector: 'app-student-account',
  imports: [CourseGridComponent, LessonReportComponent, AllLessonsComponent, ChatComponent, UpdateUserComponent],
  templateUrl: './student-account.component.html',
  styleUrl: './student-account.component.css'
})
export class StudentAccountComponent implements OnInit{
  currentUser: any;
  currentUserId: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.authService.getById(this.currentUserId).subscribe({
      next: (response) => {
        this.currentUser = response;
      }
    })
  }





  Logout() {
    this.authService.LogOut();
  }
}
