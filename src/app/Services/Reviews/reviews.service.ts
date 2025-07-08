import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../Models/Blog/blog';
import { HttpClient } from '@angular/common/http';
import { CourseReview } from '../../Models/Course/course';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = 'http://localhost:5153/api/CourseReviews';

  constructor(private http: HttpClient) { }

  // Course Reviews related methods
  AddReview(review: CourseReview): Observable<CourseReview> {
    return this.http.post<CourseReview>(this.apiUrl + '/add-review', review);
  }

  getReviewsByCourseId(courseId: number): Observable<CourseReview[]> {
    return this.http.get<CourseReview[]>(`${this.apiUrl}/get-reviews-by-course/${courseId}`);
  }

  getReviewsByStudentId(studentId: string): Observable<CourseReview[]> {
    return this.http.get<CourseReview[]>(`${this.apiUrl}/get-reviews-by-student/${studentId}`);
  }

  getAverageRatingByCourseId(courseId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-average-rating-by-course/${courseId}`);
  }
}
