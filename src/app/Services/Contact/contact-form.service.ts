import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private endpoint = 'contactform';
  constructor(private api: ApiService) { }

  sendEntry(formData: FormData): Observable<any> {
    return this.api.post(this.endpoint, formData);
  }
}
