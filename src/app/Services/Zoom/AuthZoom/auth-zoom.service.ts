import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoomUserConnection } from '../../../Models/Zoom/zoom';
import { ApiService } from '../../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthZoomService {
  private baseUrl = 'ZoomAuth';
  constructor(private api: ApiService) { }

  getAuthorizationUrl(userId: string): Observable<{ url: string, state: string }> {
    return this.api.get<{ url: string, state: string }>
    (`${this.baseUrl}/connect/${encodeURIComponent(userId)}`);
  }

  handleCallback(code: string, state: string): Observable<ZoomUserConnection> {
    return this.api.get<ZoomUserConnection>(
      `${this.baseUrl}/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
    );
  }

  getStatus(userId: string): Observable<ZoomUserConnection> {
    return this.api.get<ZoomUserConnection>(`${this.baseUrl}/status/${userId}`);
  }

  refreshToken(userId: string): Observable<{ accessToken: string }> {
    return this.api.post<{ accessToken: string }>(`${this.baseUrl}/refresh/${userId}`, {});
  }

  revokeAccess(userId: string): Observable<{ revoked: boolean }> {
    return this.api.post<{ revoked: boolean }>(`${this.baseUrl}/revoke/${userId}`, {});
  }
}
