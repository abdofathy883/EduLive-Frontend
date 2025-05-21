import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../Services/Courses/courses.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category, NewCourse } from '../../Models/Course/course';
import { AuthService } from '../../Services/Auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent implements OnInit, OnDestroy {
  private courseService = inject(CoursesService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private currentInstructor!: string;
  private userSubscription!: Subscription;
  loading: boolean = false;
  public CategoriesList: any[] = [];
  private courseImage!: File;

  courseForm!: FormGroup;
  onFileSelected(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (field === 'image') {
        this.courseImage = file;
      }
    }
  }
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      originalPrice: ['', Validators.required],
      discountedPrice: [''],
      image: [null, Validators.required],
      nuOfLessons: ['', Validators.required],
      instructorId: ['', Validators.required],
      certificateSerialNumber: [null],
    });

    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentInstructor = user.id;
      }
    });
    this.courseForm.patchValue({ instructorId: this.currentInstructor });
    this.courseService.getAllCategories().subscribe((categories) => {
      this.CategoriesList = categories;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSubmit() {
    this.loading = true;
    if (!this.currentInstructor) {
      return;
    }
    if (this.courseForm.invalid) {
      this.loading = false;
      return;
    }
    const course: NewCourse = {
      title: this.courseForm.value.title,
      categoryId: this.courseForm.value.categoryId,
      description: this.courseForm.value.description,
      originalPrice: this.courseForm.value.originalPrice,
      discountedPrice: this.courseForm.value.discountedPrice,
      nuOfLessons: this.courseForm.value.nuOfLessons,
      courseImage: this.courseImage,
      instructorId: this.currentInstructor,
      certificateSerialNumber: this.courseForm.value.certificateSerialNumber,
    };

    this.courseService.addCourse(course).subscribe({
      next: (response) => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}
