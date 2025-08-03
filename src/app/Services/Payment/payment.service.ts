import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = "Payments";
  constructor(private api: ApiService) { }

  CreateCheckoutSession(paymentData: any): Observable<{ url: string }> {
    return this.api.post<{ url: string }>(`${this.apiUrl}/create-checkout-session`, paymentData);
  }
}
