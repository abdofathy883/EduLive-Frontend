import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../../Services/Courses/courses.service';

@Component({
  selector: 'app-courses-filter-sidebar',
  imports: [],
  templateUrl: './courses-filter-sidebar.component.html',
  styleUrl: './courses-filter-sidebar.component.css'
})
export class CoursesFilterSidebarComponent implements OnInit {
  private courseService = inject(CoursesService);
  Categories!: any[];
  ngOnInit(): void {
    this.courseService.getAllCategories().subscribe({
      next: (response) => {
        this.Categories = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
