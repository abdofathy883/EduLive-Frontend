import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private apiUrl = 'http://localhost:5153/api/ContactForm/submit-contact-form';
  constructor(private http: HttpClient) { }

  sendEntry(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
