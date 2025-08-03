import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseReview } from '../../Models/Course/course';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = 'CourseReviews';

  constructor(private api: ApiService) { }

  // Course Reviews related methods
  AddReview(review: CourseReview): Observable<CourseReview> {
    return this.api.post<CourseReview>(this.apiUrl + '/add-review', review);
  }

  getReviewsByCourseId(courseId: number): Observable<CourseReview[]> {
    return this.api.get<CourseReview[]>(`${this.apiUrl}/get-reviews-by-course/${courseId}`);
  }

  // getReviewsByStudentId(studentId: string): Observable<CourseReview[]> {
  //   return this.api.get<CourseReview[]>(`${this.apiUrl}/get-reviews-by-student/${studentId}`);
  // }

  getAverageRatingByCourseId(courseId: number): Observable<number> {
    return this.api.get<number>(`${this.apiUrl}/average-rating/${courseId}`);
  }
}
