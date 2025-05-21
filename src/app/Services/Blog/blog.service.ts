import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../Models/Blog/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = '';
  private http = inject(HttpClient);

  constructor() { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl + '/get-all-blogs');
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.apiUrl + '/get-blog/' + id);
  }
}
