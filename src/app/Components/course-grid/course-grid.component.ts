import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-grid',
  imports: [],
  templateUrl: './course-grid.component.html',
  styleUrl: './course-grid.component.css',
})
export class CourseGridComponent {
  private router = inject(Router);
  @Output() openCourse = new EventEmitter<number>();
  pageSize = 9; // blogs per page
  currentPage = 1;
  courses = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Course Title ${i + 1}`,
    category: `Category ${i + 1}`,
    lessons: 8,
    price: 250,
    oldPrice: 350,
    image: '/assets/minimalism4.jpg',
  }));

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
