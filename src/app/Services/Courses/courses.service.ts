import { Injectable } from '@angular/core';
import { Course, NewCourse } from '../../Models/Course/course';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private endpoint = 'courses';
  private categoryEndpoint = 'category';

  constructor(private api: ApiService) { }

  // Course related methods

  getAllCourses(): Observable<any[]> {
    return this.api.get<any[]>(`${this.endpoint}/all-courses`);
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.api.get<Course>(`${this.endpoint}/get-course/${courseId}`);
  }

  addCourse(course: NewCourse): Observable<NewCourse> {
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('categoryId', course.categoryId);
    formData.append('description', course.description);
    formData.append('originalPrice', course.originalPrice.toString());
    formData.append('salePrice', course.salePrice.toString());
    formData.append('nuOfLessons', course.nuOfLessons.toString());
    formData.append('instructorId', course.instructorId);
    formData.append(
      'certificateSerialNumber',
      course.certificateSerialNumber ? course.certificateSerialNumber : ''
    );
    formData.append('courseImage', course.courseImage, course.courseImage.name);
    return this.api.post<NewCourse>(`${this.endpoint}/add-course`, formData);
  }

  updateCourse(id: number, course: NewCourse): Observable<NewCourse> {
    return this.api.put<NewCourse>(`${this.endpoint}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  // Student related methods
  getStudentCourses(studentId: number): Observable<Course[]> {
    return this.api.get<Course[]>(`${this.endpoint}/enrolled-course/${studentId}`);
  }

  // Instructor related methods
  getInstructorCourses(instructorId: string): Observable<Course[]> {
    return this.api.get<Course[]>(`${this.endpoint}/owned-course/${instructorId}`);
  }

  getInstructorById(instructorId: number): Observable<any> {
    return this.api.get<any>(`${this.endpoint}/get-instructor/${instructorId}`);
  }

  getStudentsByCourseId(courseId: number): Observable<any[]> {
    return this.api.get<any[]>(`${this.endpoint}/get-students-by-course/${courseId}`);
  }

  // Category related methods
  getAllCategories(): Observable<string[]> {
    return this.api.get<string[]>(`${this.categoryEndpoint}/all-categories`);
  }
}
