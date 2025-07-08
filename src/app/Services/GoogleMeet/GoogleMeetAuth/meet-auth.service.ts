import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetAuthService {

  private apiURL = 'https://meet.google.com/';
  constructor(private http: HttpClient) { }

  getAuthorizationUrl(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiURL}/Authorize`);
  }

  // Handle the OAuth callback (if you want to call from frontend)
  handleCallback(code: string, state: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Callback?code=${code}&state=${state}`);
  }

  // Check if the user is connected to Google Meet
  checkConnectionStatus(userId: string): Observable<{ isConnected: boolean }> {
    return this.http.get<{ isConnected: boolean }>(`${this.apiURL}/Status/${userId}`);
  }

  // Get the connected Google Meet account info
  getAccount(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/Account/${userId}`);
  }
}
