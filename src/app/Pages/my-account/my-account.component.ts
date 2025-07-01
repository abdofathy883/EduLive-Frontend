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
import { CoursesService } from '../../Services/Courses/courses.service';

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
  currentUser: any = null;
  userRole: string = '';
  instructorCourses: any[] = [];
  private userSubscription: Subscription | null = null;
  private courseSubscription: Subscription | null = null;
  isApproved: boolean = false;

  constructor(
    private authService: AuthService,
    private courseService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser.isApproved === true) {
        this.isApproved = true;
      }
    });

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
      if (user && user.id) {
        this.loadInstructorCourses(user.id);
      }
    });
    if (this.currentUser && this.currentUser.id) {
      this.loadInstructorCourses(this.currentUser.id);
      console.log('Courses:', this.instructorCourses);
    }
  }

  loadInstructorCourses(instructorId: string) {
    this.courseSubscription = this.courseService
      .getInstructorCourses(instructorId)
      .subscribe({
        next: (courses) => {
          this.instructorCourses = courses;
          console.log('Instructor Courses:', this.instructorCourses);
        },
        error: (error) => {
          console.error('Error loading instructor courses:', error);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
