import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../Services/Courses/courses.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { User } from '../../Models/User/user';
import { Course } from '../../Models/Course/course';
import { EnrollmentService } from '../../Services/enrollment/enrollment.service';

@Component({
  selector: 'app-course-grid',
  imports: [RouterLink],
  templateUrl: './course-grid.component.html',
  styleUrl: './course-grid.component.css',
})
export class CourseGridComponent implements OnInit {
  @Output() openCourse = new EventEmitter<number>();
  @Input() instructorId: string | null = null;
  currentUser: User | null = null;
  pageSize = 9; // blogs per page
  currentPage = 1;
  courses: Course[] = [];
  currentUserId: string = '';

  constructor(
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.authService.getById(this.currentUserId).subscribe({
      next: (response) => {
        this.currentUser = response;
      }
    })
    console.log(this.currentUser?.userId)
    this.loadCourses();
  }

  loadCourses() {
    if (!this.currentUser) {
      return;
    }
    const isStudent = this.authService.isStudent();
    const isInstructor = this.authService.isInstructor();
    if (isStudent) {
      this.enrollmentService
        .getInstructorCourses(this.currentUser?.userId)
        .subscribe({
          next: (response) => {
            this.courses = response;
          },
          error: (error) =>
            console.error('Error loading student courses:', error),
        });
    }

    if (isInstructor) {
      this.enrollmentService
        .getInstructorCourses(this.currentUser?.userId)
        .subscribe({
          next: (response) => {
            this.courses = response;
          },
          error: (error) =>
            console.error('Error loading instructor courses:', error),
        });
    }
  }

  pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedCourses() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.courses.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.courses.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  goToCourse(id: number) {
    // const slug = course.title.toLowerCase().replace(/ /g, '-');
    // this.router.navigate(['/courses', slug]);
    this.openCourse.emit(id);
  }
}
