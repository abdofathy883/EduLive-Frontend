import { Component, OnInit } from '@angular/core';
import { MeetService } from '../../Services/GoogleMeet/meet-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetAuthService } from '../../Services/GoogleMeet/GoogleMeetAuth/meet-auth.service';
import { CoursesService } from '../../Services/Courses/courses.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../Models/User/user';

@Component({
  selector: 'app-add-meet-lesson',
  imports: [],
  templateUrl: './add-meet-lesson.component.html',
  styleUrl: './add-meet-lesson.component.css'
})
export class AddMeetLessonComponent implements OnInit {
  status: boolean = false;
  students: any[] = [];
  Courses: any[] = [];
  instructorId: string = '';
  currentUser: any;
  
  loading: boolean = false;
  meetingForm!: FormGroup;
  constructor(
    private meetService: MeetService,
    private meetAuthService: MeetAuthService,
    private courseService: CoursesService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    // this.getUserStatus();
    this.initializeForm();
    // this.loadNeededData();
  }

  initializeForm() {
    this.meetingForm = this.fb.group({
      topic: ['', [Validators.required]],
      description: [''],
      startTime: ['', [Validators.required]],
      duration: [60, [Validators.required, Validators.min(15)]],
      courseId: ['', [Validators.required]],
      studentId: ['', [Validators.required]]
    });
  }

  loadNeededData() {
    this.instructorId = this.currentUser.userId;
      this.courseService.getInstructorCourses(this.instructorId).subscribe({
        next: (courses) => {
          this.Courses = courses;          
        },
        error: (error) => {
          console.error('Error fetching courses:', error);
        }
      });
      this.courseService.getStudentsByCourseId(this.Courses[0]?.id).subscribe({
        next: (students) => {
          this.students = students;
        },
        error: (error) => {
          console.error('Error fetching students:', error);
        }
      });
  }

  getUserStatus() {
    this.meetAuthService.checkConnectionStatus(this.currentUser.userId).subscribe({
      next: res => {
        if (res.isConnected === true) {
          console.log('User is connected to Google Meet');
          this.status = true;
        } else {
          console.log('User is not connected to Google Meet');
          this.status = false;
        }
      },
      error: err => console.error('Error fetching user status:', err)
    });
    return false;
  }

  connectMeetAccount() {
    this.meetAuthService.getAuthorizationUrl().subscribe({
      next: res => window.location.href = res.url,
      error: err => console.error('Error connecting to Google Meet:', err)
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.meetingForm.invalid) {
      this.loading = false;
      return;
    }
    this.meetingForm = {
      ...this.meetingForm.value,
      startTime: new Date(this.meetingForm.value.startTime)
    }
    this.meetService.CreateMeetLesson(this.meetingForm).subscribe({
      next: (response) => {
        console.log('Meeting created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating meeting:', error);
      }
    });
  }
}
