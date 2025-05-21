import { Category } from './../../Models/Course/course';
import { RegisterInstructor } from './../../Models/User/user';
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../Services/Courses/courses.service';
import { NewCourse } from '../../Models/Course/course';

@Component({
  selector: 'app-single-course',
  imports: [],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css',
})
export class SingleCourseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private coursesService = inject(CoursesService);
  // slug!: string;
  course!: any; // Replace 'any' with the appropriate type if known
  courses: any[] = [];
  instructor!: any;
  category!: any;

  
  ngOnInit() {
    const currentCourse = this.route.snapshot.paramMap.get('id');
    this.coursesService.getAllCourses().subscribe((courses) => {
      this.courses = courses;
    });

    // this.route.paramMap.subscribe(params => {
    //   this.slug = params.get('slug') || '';
    //   this.course = this.courses.find(c =>
    //     c.title.toLowerCase().replace(/ /g, '-') === this.slug
    //   );
    // });

    if (currentCourse) {
      this.coursesService.getAllCourses().subscribe((courses) => {
        this.course = courses.find((course) => course.id === +currentCourse);

        this.coursesService
          .getInstructorById(this.course.instructorId)
          .subscribe((instructor) => {
            this.instructor = instructor;
          });

        this.coursesService.getAllCategories().subscribe(categories => {
          this.category = categories.find(
            (category: any) => category && category.id === this.course.categoryId
          );
        });
      });
    }
  }
}
