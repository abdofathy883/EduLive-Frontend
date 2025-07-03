import { PaymentService } from './../../Services/Payment/payment.service';
import { Category } from './../../Models/Course/course';
import { RegisterInstructor } from './../../Models/User/user';
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../Services/Courses/courses.service';
import { NewCourse } from '../../Models/Course/course';
import { AuthService } from '../../Services/Auth/auth.service';
import { CourseReviewsComponent } from "../../Components/course-reviews/course-reviews.component";

@Component({
  selector: 'app-single-course',
  imports: [CourseReviewsComponent],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css',
})
export class SingleCourseComponent implements OnInit {
  constructor(private route: ActivatedRoute,
                private router: Router,
                private coursesService: CoursesService,
                private authService: AuthService,
                private paymentService: PaymentService
  ) {}
  
  currentUser: any = null;
  // slug!: string;
  course!: any; // Replace 'any' with the appropriate type if known
  courses: any[] = [];
  instructor!: any;
  category!: any;

  paymentData: any;

  loadCourse(){
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
        this.loadInstructorAndCategory();
        this.setupPaymentData();
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
        this.router.navigate(['/courses']);
      },
    })
  }

  loadInstructorAndCategory() {
    if (!this.course) return;

    if (this.course.instructorId) {
      this.coursesService.getInstructorById(this.course.instructorId).subscribe((instructor) => {
        this.instructor = instructor;
      });
    }

    if (this.course.categoryId) {
      this.coursesService.getCategoryById(this.course.categoryId).subscribe((category) => {
        this.category = category;
      });
    }
  }

  setupPaymentData() {
    if (this.course && this.currentUser) {
      this.paymentData = {
        courseId: this.course?.id,
        studentId: this.currentUser?.id,
        amount:
          this.course && this.course.discountedPrice > 0
            ? this.course.discountedPrice
            : this.course?.originalPrice,
      };
      console.log('Payment Data:', this.paymentData);
    }
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      console.log('User not logged in');
      return;
    }
    this.loadCourse();
  }

  PurchaseCourse(paymentData: any) {
    console.log('Payment Data:', paymentData);
    console.log('Current User:', this.currentUser); 
    console.log('Course:', this.course);


    const token = localStorage.getItem('token');

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.paymentService.CreateCheckoutSession(paymentData).subscribe({
      next: (res) => {
        window.location.href = res.url;
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
