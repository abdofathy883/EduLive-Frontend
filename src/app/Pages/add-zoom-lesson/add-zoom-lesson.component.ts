import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCourse } from '../../Models/Course/course';
import { ZoomService } from '../../Services/Zoom/zoom.service';
import { CoursesService } from '../../Services/Courses/courses.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-add-zoom-lesson',
  imports: [],
  templateUrl: './add-zoom-lesson.component.html',
  styleUrl: './add-zoom-lesson.component.css'
})
export class AddZoomLessonComponent implements OnInit {
  private zoomService = inject(ZoomService);
  private courseService = inject(CoursesService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  meetingForm!: FormGroup;
  Courses: NewCourse[] = [];
  loading: boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {
    this.initForm();
    // this.loadCourse();
  }

  // private loadCourse(): void {
  //   const instructorId = 1; // Replace with the actual instructor ID
  //   this.courseService.getInstructorCourses(instructorId).subscribe(
  //     (courses) => {
  //       this.Courses = courses;
  //     },
  //     (error) => {
  //       console.error('Error fetching courses:', error);
  //     }
  //   );
  // }

  private initForm(): void {
    this.meetingForm = this.formBuilder.group({
      topic: ['', [Validators.required]],
      description: [''],
      startTime: ['', [Validators.required]],
      duration: [60, [Validators.required, Validators.min(15)]],
      courseId: ['', [Validators.required]]
    });
  }


  // onSubmit(): void {
  //   this.submitted = true;

  //   if (this.meetingForm.invalid) {
  //     return;
  //   }
  //   this.loading = true;
  //   const meetingData = {
  //     ...this.meetingForm.value,
  //     // instructorId: this.authService.getCurrentUser().id,
  //     startTime: new Date(this.meetingForm.value.startTime)
  //   };
  //   this.zoomService.createZoomMeeting(meetingData).subscribe(
  //     (response) => {
  //       this.loading = false;
  //       console.log('Zoom meeting created successfully:', response);
  //       this.router.navigate(['/courses']); // needs update
  //     },
  //     (error) => {
  //       console.error('Error creating Zoom meeting:', error);
  //     }
  //   );
  // }


}

