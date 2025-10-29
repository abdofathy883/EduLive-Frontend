import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../Services/Reviews/reviews.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseReview } from '../../Models/Course/course';
import { User } from '../../Models/User/user';

@Component({
  selector: 'app-course-reviews',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-reviews.component.html',
  styleUrl: './course-reviews.component.css',
})
export class CourseReviewsComponent implements OnInit {
  isLoading: boolean = false;
  courseId: number = 0;
  currentUser: User | null = null;
  reviewForm!: FormGroup;
  rating: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  averageRating: number = 0;
  reviewsList: any[] = [];
  currentUserId: string = '';
  isStudent: boolean = false;

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.authService.getById(this.currentUserId).subscribe({
      next: (response) => {
        this.currentUser = response;
      }
    })
    this.authService.isStudent().subscribe((student) => {
      if (student) {
        this.isStudent = true
      }
    })

    const courseIdParam = this.route.snapshot.paramMap.get('id');
    this.courseId = courseIdParam
      ? Number(courseIdParam)
      : Number(courseIdParam);

      this.reviewsService.getAverageRatingByCourseId(this.courseId).subscribe({
      next: (response) => {
        this.averageRating = response;
        console.log('Average Rating:', this.averageRating);
      },
      error: (error) => {
        console.error('Error fetching average rating:', error);
      },
    });

    this.reviewsService.getReviewsByCourseId(this.courseId).subscribe({
      next: (response) => {
        this.reviewsList = response;
        console.log('Reviews List:', this.reviewsList);
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      },
    });

    this.initializeReview();
  }

  setRating(rating: number) {
    this.rating = rating;
    this.reviewForm.patchValue({ rating: rating });
  }

  initializeReview() {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [''],
      courseId: [this.courseId],
      userId: [this.currentUser?.userId],
    });
  }

  getUserRole() {
    return;
  }

  submit() {
    if (!this.currentUser) {
      this.errorMessage = 'لا يمكنك إضافة مراجعة إلا بعد تسجيل الدخول';
      return;
    }
    
    if (!this.isStudent) {
      this.errorMessage = 'يُسمح للطلاب فقط بإضافة مراجعات';
      return;
    }
    if (this.reviewForm.invalid) {
      this.isLoading = false;
      this.errorMessage = 'يرجى التأكد من صحة البيانات المدخلة';
      return;
    }

    const reviewData: CourseReview = {
      courseId: this.courseId,
      studentId: this.currentUser.userId,
      rating: this.reviewForm.get('rating')?.value,
      comment: this.reviewForm.get('comment')?.value,
    };

    this.reviewsService.AddReview(reviewData).subscribe({
      next: (response) => {
        console.log('Review created successfully:', response);
        this.successMessage = 'تم إضافة المراجعة بنجاح';
        this.reviewForm.reset();
        this.rating = 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating review:', error);
        this.errorMessage = 'حدث خطأ أثناء إضافة المراجعة';
        this.isLoading = false;
      },
    });
  }
}
