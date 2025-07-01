import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../Services/Courses/courses.service';

@Component({
  selector: 'app-course-grid',
  imports: [RouterLink],
  templateUrl: './course-grid.component.html',
  styleUrl: './course-grid.component.css',
})
export class CourseGridComponent implements OnInit {
  @Output() openCourse = new EventEmitter<number>();
  @Input() instructorId: string | null = null;
  pageSize = 9; // blogs per page
  currentPage = 1;
  courses: any[] = [];

  constructor(private router: Router, private courseService: CoursesService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        // this.updatePagedCourses();
      },
      error: (error) => console.error('Error loading courses:', error)
    });
  }

  

  //was used for my account page to load instructor courses
  // if (this.instructorId) {
  //   this.courseService.getInstructorCourses(this.instructorId).subscribe({
  //     next: (data) => {
  //       this.courses = data;
  //       console.log('Instructor Courses from grid:', this.courses);
  //     },
  //     error: (error) => console.error('Error loading instructor courses:', error)
  //   // Load courses for a specific instructor
  //   });
  // } else {
  //   // Load all courses (for the general courses page)
  // }

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
