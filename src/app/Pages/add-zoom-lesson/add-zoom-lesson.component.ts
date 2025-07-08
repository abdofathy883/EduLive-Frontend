import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCourse } from '../../Models/Course/course';
import { ZoomService } from '../../Services/Zoom/zoom.service';
import { CoursesService } from '../../Services/Courses/courses.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { AuthZoomService } from '../../Services/Zoom/AuthZoom/auth-zoom.service';

@Component({
  selector: 'app-add-zoom-lesson',
  imports: [],
  templateUrl: './add-zoom-lesson.component.html',
  styleUrl: './add-zoom-lesson.component.css',
})
export class AddZoomLessonComponent implements OnInit {
  meetingForm!: FormGroup;
  Courses: any[] = [];
  loading: boolean = false;
  submitted: boolean = false;
  instructorId: string = '';
  students: any[] = [];
  status: boolean = false;

  constructor(
    private zoomAuthService: AuthZoomService,
    private zoomService: ZoomService,
    private courseService: CoursesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}
  ngOnInit() {
    this.getUserStatus();
    this.initForm();
    this.loadNeededData();
  }

  loadNeededData() {
    this.authService.currentUser$.subscribe((user) => {
      this.instructorId = user.id;
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
    });
  }

  connectZoomAccount() {
    this.zoomAuthService.getAuthorizationUrl().subscribe({
      next: res => window.location.href = res.url,
    })
  }

  getUserStatus() {
    this.zoomAuthService.getStatus(this.instructorId).subscribe({
      next: res => {
        if (res.isConnected === true) {
          console.log('User is connected to Zoom');
          this.status = true;
        } else {
          console.log('User is not connected to Zoom');
          this.status = false;
        }
      },
      error: err => console.error('Error fetching user status:', err)
    });
    return false;
  }

  private initForm(): void {
    this.meetingForm = this.formBuilder.group({
      topic: ['', [Validators.required]],
      description: [''],
      startTime: ['', [Validators.required]],
      duration: [60, [Validators.required, Validators.min(15)]],
      courseId: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      instructorId: [this.instructorId, [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.meetingForm.invalid) {
      return;
    }
    this.loading = true;
    const meetingData = {
      ...this.meetingForm.value,
      startTime: new Date(this.meetingForm.value.startTime)
    };
    this.zoomService.createZoomMeeting(meetingData).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Zoom meeting created successfully:', response);
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        console.error('Error creating Zoom meeting:', error);
        this.loading = false;
      }
    });
  }
}
