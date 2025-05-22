import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoomUserConnection } from '../../../Models/Zoom/zoom';

@Injectable({
  providedIn: 'root'
})
export class AuthZoomService {
  private baseUrl = 'http://localhost:5153/api/ZoomAuth';
  constructor(private http: HttpClient) { }

  getAuthorizationUrl(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.baseUrl}/connect`);
  }

  handleCallback(code: string, userId: string): Observable<ZoomUserConnection> {
    return this.http.get<ZoomUserConnection>(
      `${this.baseUrl}/callback`,
      { params: { code, state: userId } }
    );
  }

  getStatus(userId: string): Observable<ZoomUserConnection> {
    return this.http.get<ZoomUserConnection>(`${this.baseUrl}/status/${userId}`);
  }

  refreshToken(userId: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/refresh/${userId}`, {});
  }

  revokeAccess(userId: string): Observable<{ revoked: boolean }> {
    return this.http.post<{ revoked: boolean }>(`${this.baseUrl}/revoke/${userId}`, {});
  }
}
