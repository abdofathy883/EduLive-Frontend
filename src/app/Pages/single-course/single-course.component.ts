import { PaymentService } from './../../Services/Payment/payment.service';
import { Category, Course } from './../../Models/Course/course';
import { RegisterInstructor, User } from './../../Models/User/user';
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../Services/Courses/courses.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { CourseReviewsComponent } from '../../Components/course-reviews/course-reviews.component';

@Component({
  selector: 'app-single-course',
  imports: [CourseReviewsComponent],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css',
})
export class SingleCourseComponent implements OnInit {
  paymentErrorMessage: string = '';
  paymentSuccessMessage: string = '';
  currentUserId: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  currentUser!: User | null;
  // slug!: string;
  course!: Course;
  instructor!: any;
  paymentData: any;

  loadCourse() {
    const courseIdParam = this.route.snapshot.paramMap.get('id');
    const courseId = courseIdParam
      ? Number(courseIdParam)
      : Number(courseIdParam);
    if (!courseId) {
      this.router.navigate(['/courses']);
      return;
    }

    this.coursesService.getCourseById(courseId).subscribe({
      next: (response) => {
        this.course = response;
        this.setupPaymentData();
      },
      error: (error) => {
        this.router.navigate(['/courses']);
      },
    });
  }

  setupPaymentData() {
    if (!this.currentUser) {
      this.paymentErrorMessage = 'يجب تسجيل الدخول اولا ثم متابعة الاشتراك';
      return;
    }
    if (this.course) {
      this.paymentData = {
        courseId: this.course?.id,
        studentId: this.currentUser?.userId,
        amount:
          this.course && this.course.originalPrice > 0
            ? this.course.salePrice
            : this.course?.originalPrice,
      };
      console.log('Payment Data:', this.paymentData);
    }
  }

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId();
    this.authService.getById(this.currentUserId).subscribe({
      next: (response) => {
        this.currentUser = response;
      }
    })
    this.loadCourse();
  }

  PurchaseCourse(paymentData: any) {
    console.log('Payment Data:', paymentData);
    console.log('Current User:', this.currentUser);
    console.log('Course:', this.course);

    this.paymentService.CreateCheckoutSession(paymentData).subscribe({
      next: (res) => {
        window.location.href = res.url;
        this.paymentSuccessMessage = 'تم الاشتراك بنجاح في الدورة التعليمية';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

/// Uncomment the following lines if you want to use the slug functionality
// this.route.paramMap.subscribe(params => {
//   this.slug = params.get('slug') || '';
//   this.course = this.courses.find(c =>
//     c.title.toLowerCase().replace(/ /g, '-') === this.slug
//   );
// });
