import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../Models/Blog/blog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = 'http://localhost:5153/api/CourseReviews';

  constructor(private http: HttpClient) { }

  // Course Reviews related methods
  AddReview(review: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add-review', review);
  }

  getReviewsByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-reviews-by-course/${courseId}`);
  }

  getReviewsByStudentId(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-reviews-by-student/${studentId}`);
  }

  getAverageRatingByCourseId(courseId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-average-rating-by-course/${courseId}`);
  }
}
