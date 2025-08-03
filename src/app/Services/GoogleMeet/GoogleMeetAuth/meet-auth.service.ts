import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class MeetAuthService {

  private apiURL = 'meetauth';
  constructor(private api: ApiService) { }

  getAuthorizationUrl(): Observable<{ url: string }> {
    return this.api.get<{ url: string }>(`${this.apiURL}/Authorize`);
  }

  // Handle the OAuth callback (if you want to call from frontend)
  handleCallback(code: string, state: string): Observable<any> {
    return this.api.get<any>(`${this.apiURL}/Callback?code=${code}&state=${state}`);
  }

  // Check if the user is connected to Google Meet
  checkConnectionStatus(userId: string): Observable<{ isConnected: boolean }> {
    return this.api.get<{ isConnected: boolean }>(`${this.apiURL}/Status/${userId}`);
  }

  // Get the connected Google Meet account info
  getAccount(userId: string): Observable<any> {
    return this.api.get<any>(`${this.apiURL}/Account/${userId}`);
  }
}
