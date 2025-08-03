import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../Services/Courses/courses.service';
import { Router, RouterLink } from '@angular/router';
import { Course } from '../../Models/Course/course';

@Component({
  selector: 'app-all-courses',
  imports: [RouterLink],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent implements OnInit {
  Categories!: any[];
  courses: Course[] = [];
  pageSize = 9;
  currentPage = 1;

  constructor(
    private courseService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
        // this.updatePagedCourses();
      }
    });

    this.courseService.getAllCategories().subscribe({
      next: (response) => {
        this.Categories = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
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
    this.router.navigate(['/courses', id]);
    // this.openCourse.emit(id);
  }

}
