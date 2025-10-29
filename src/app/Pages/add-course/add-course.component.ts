import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../../Services/Courses/courses.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewCourse } from '../../Models/Course/course';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent implements OnInit {
  @Input() instructorId: string = '';
  loading: boolean = false;
  public CategoriesList: any[] = [];
  private courseImage!: File;

  courseForm!: FormGroup;

  constructor(
    private courseService: CoursesService,
    private fb: FormBuilder,
  ) {}
  onFileSelected(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (field === 'image') {
        this.courseImage = file;
        this.courseForm.patchValue({ image: file });
      }
    }
  }
  ngOnInit(): void {
    this.loadCategories();
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      originalPrice: ['', Validators.required],
      discountedPrice: [''],
      image: [null, Validators.required],
      nuOfLessons: ['', Validators.required],
      instructorId: [this.instructorId],
      certificateSerialNumber: ['test-serial-number'], // Placeholder, replace with actual logic if needed
    });
  }

  loadCategories() {
    this.courseService.getAllCategories().subscribe({
      next: (categories) => {
        this.CategoriesList = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.courseForm.invalid) {
      this.loading = false;
      this.courseForm.markAllAsTouched();
      return;
    }
    const course: NewCourse = {
      title: this.courseForm.value.title,
      categoryId: this.courseForm.value.categoryId,
      description: this.courseForm.value.description,
      originalPrice: this.courseForm.value.originalPrice,
      salePrice: this.courseForm.value.discountedPrice,
      nuOfLessons: this.courseForm.value.nuOfLessons,
      courseImage: this.courseImage,
      instructorId: this.instructorId,
      // certificateSerialNumber: this.courseForm.value.certificateSerialNumber,
      certificateSerialNumber: ' test-serial-number', // Placeholder, replace with actual logic if needed
    };

    this.courseService.addCourse(course).subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error adding course:', error);
        this.loading = false;
      },
    });
  }

  hasError(controlName: string): boolean {
  const control = this.courseForm.get(controlName);
  return control ? control.invalid && control.touched : false;
}
}
