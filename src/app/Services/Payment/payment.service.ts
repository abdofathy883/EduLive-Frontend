import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = "http://localhost:5153/api/Payments";
  constructor(private http: HttpClient) { }

  CreateCheckoutSession(paymentData: any): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.apiUrl}/create-checkout-session`, paymentData);
  }
}
