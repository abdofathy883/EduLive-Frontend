import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Observable } from 'rxjs';
import { Course } from '../../Models/Course/course';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private endpoint = 'enrollment';
  constructor(private api: ApiService) {}

  // Student related methods
  getStudentCourses(studentId: number): Observable<Course[]> {
    return this.api.get<Course[]>(
      `${this.endpoint}/enrolled-courses/${studentId}`
    );
  }

  // Instructor related methods
  getInstructorCourses(instructorId: string): Observable<Course[]> {
    return this.api.get<Course[]>(
      `${this.endpoint}/instructor-courses/${instructorId}`
    );
  }

  getStudentsByCourseId(courseId: number): Observable<any[]> {
    return this.api.get<any[]>(`${this.endpoint}/student-courses/${courseId}`);
  }
}
