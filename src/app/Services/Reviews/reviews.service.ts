import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../Models/Blog/blog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private http = inject(HttpClient);
  private apiUrl = '';

  getAllReviews(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl + '/get-all-reviews');
  }
}
