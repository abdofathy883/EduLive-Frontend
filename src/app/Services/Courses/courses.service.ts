import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewCourse } from '../../Models/Course/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:5153/api/Courses';
  private apiUrlCategory = 'http://localhost:5153/api/Category';

  constructor(private http: HttpClient) { }

  // Course related methods

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "/all-courses");
  }

  getCourseById(courseId: number): Observable<NewCourse> {
    return this.http.get<NewCourse>(`${this.apiUrl}/get-course/${courseId}`);
  }

  addCourse(course: NewCourse): Observable<NewCourse> {
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('categoryId', course.categoryId);
    formData.append('description', course.description);
    formData.append('originalPrice', course.originalPrice.toString());
    formData.append('salePrice', course.discountedPrice.toString());
    formData.append('nuOfLessons', course.nuOfLessons.toString());
    formData.append('instructorId', course.instructorId);
    formData.append(
      'certificateSerialNumber',
      course.certificateSerialNumber ? course.certificateSerialNumber : ''
    );
    formData.append('courseImage', course.courseImage, course.courseImage.name);
    return this.http.post<NewCourse>(`${this.apiUrl}/add-new-course`, formData);
  }

  updateCourse(id: number, course: NewCourse): Observable<NewCourse> {
    return this.http.put<NewCourse>(this.apiUrl + `/update-course${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/delete-course");
  }

  // Student related methods
  getStudentCourses(studentId: number): Observable<NewCourse[]> {
    return this.http.get<NewCourse[]>(this.apiUrl + `/enrolled-course/${studentId}`);
  }

  // Instructor related methods
  getInstructorCourses(instructorId: string): Observable<NewCourse[]> {
    return this.http.get<NewCourse[]>(this.apiUrl + `/owned-course/${instructorId}`);
  }

  getInstructorById(instructorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-instructor/${instructorId}`);
  }

  // Category related methods
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrlCategory + "/all-categories");
  }

  getCategoryById(categoryId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrlCategory}/get-category/${categoryId}`);
  }
}
