import { Component } from '@angular/core';
import { CoursesFilterSidebarComponent } from "../../Components/courses-filter-sidebar/courses-filter-sidebar.component";
import { CourseGridComponent } from "../../Components/course-grid/course-grid.component";

@Component({
  selector: 'app-all-courses',
  imports: [CoursesFilterSidebarComponent, CourseGridComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {

}
