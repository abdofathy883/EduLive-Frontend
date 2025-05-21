import { LessonReportComponent } from './../../Components/lesson-report/lesson-report.component';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AddCourseComponent } from '../add-course/add-course.component';
import { CourseGridComponent } from '../../Components/course-grid/course-grid.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AuthService } from '../../Services/Auth/auth.service';
import { AddZoomLessonComponent } from '../add-zoom-lesson/add-zoom-lesson.component';
import { AddMeetLessonComponent } from '../add-meet-lesson/add-meet-lesson.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  imports: [
    AddCourseComponent,
    CourseGridComponent,
    UpdateUserComponent,
    LessonReportComponent,
    AddZoomLessonComponent,
    AddMeetLessonComponent,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser: any = null;
  userRole: string = '';
  private userSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    const token = localStorage.getItem('token');
    if (!this.currentUser || !token) {
      this.router.navigate(['/login']);
      return;
    }

    if (
      Array.isArray(this.currentUser.roles) &&
      this.currentUser.roles.length > 0
    ) {
      this.userRole = this.currentUser.roles[0];
    }

    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  logOut() {
    this.authService.logOut();
  }
}
