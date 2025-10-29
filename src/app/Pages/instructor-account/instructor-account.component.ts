import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { LessonReportComponent } from '../../Components/lesson-report/lesson-report.component';
import { CourseGridComponent } from '../../Components/course-grid/course-grid.component';
import { AllLessonsComponent } from '../../Components/all-lessons/all-lessons.component';
import { ChatComponent } from '../chat/chat.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AddMeetLessonComponent } from '../add-meet-lesson/add-meet-lesson.component';
import { AddZoomLessonComponent } from '../add-zoom-lesson/add-zoom-lesson.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '../../../../node_modules/@angular/router/router_module.d-BivBj8FC';

@Component({
  selector: 'app-instructor-account',
  imports: [
    LessonReportComponent,
    CourseGridComponent,
    AllLessonsComponent,
    ChatComponent,
    UpdateUserComponent,
    AddMeetLessonComponent,
    AddZoomLessonComponent,
    AddCourseComponent,
    // RouterLink,
    // RouterOutlet,
    AddCourseComponent,
  ],
  templateUrl: './instructor-account.component.html',
  styleUrl: './instructor-account.component.css',
})
export class InstructorAccountComponent implements OnInit {
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

  logOut() {
    this.authService.LogOut();
  }
}
