import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../Services/Reviews/reviews.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../Services/Courses/courses.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CourseReview } from '../../Models/Course/course';

@Component({
  selector: 'app-course-reviews',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-reviews.component.html',
  styleUrl: './course-reviews.component.css',
})
export class CourseReviewsComponent implements OnInit {
  isLoading: boolean = false;
  rating: number = 0;
  comment: string = '';

  course!: any;
  instructor!: any;
  review: CourseReview = {
    courseId: 0,
    studentId: '',
    rating: 0,
    comment: '',
  };

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadCourse();
  }

  setRating(rating: number) {
    this.rating = rating;
  }

  loadCourse() {
    const currentCourseId = this.route.snapshot.paramMap.get('id');
    if (!currentCourseId) {
      this.router.navigate(['/courses']);
      console.error('No course ID found in the route parameters');
      return;
    }
    console.log('Current Course ID:', currentCourseId);

    this.coursesService.getCourseById(+currentCourseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loadStudent();
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
        this.router.navigate(['/courses']);
      },
    });
  }

  loadStudent() {
    this.authService.currentUser$.subscribe((user) => {
      this.instructor = user;

      if (this.course && this.instructor) {
        this.initializeReview();
      }
    });
  }

  initializeReview() {
    this.review = {
      courseId: this.course.id,
      studentId: this.instructor.id,
      rating: this.rating,
      comment: this.comment,
    };
    console.log('Review:', this.review);
  }

  submit() {
    this.review.rating = this.rating;
    this.review.comment = this.comment;

    this.reviewsService.AddReview(this.review).subscribe({
      next: (response) => {
        console.log('Review created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating review:', error);
      },
    });
  }
}
