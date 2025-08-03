import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../Models/Blog/blog';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private endpoint = 'blog';
  constructor(private api: ApiService) { }

  getAll(): Observable<Blog[]> {
    return this.api.get<Blog[]>(this.endpoint);
  }

  getById(id: number): Observable<Blog> {
    return this.api.get<Blog>(`${this.endpoint}/${id}`);
  }
}
