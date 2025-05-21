import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ZoomMeeting, CreateZoomMeetingRequest, UpdateZoomMeetingRequest, ZoomUserConnection } from '../../Models/Zoom/zoom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private http = inject(HttpClient);
  private apiUrl = '';
  private authApiUrl = '';
  constructor() { }

  createZoomMeeting(meetingData: CreateZoomMeetingRequest): Observable<ZoomMeeting> {
    return this.http.post<ZoomMeeting>(this.apiUrl, meetingData);
  }

  updateZoomMeeting(meetingId: string, meeting: UpdateZoomMeetingRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${meetingId}`, meeting);
  }

  disconnectZoomAccount(): Observable<void> {
    return this.http.post<void>(`${this.authApiUrl}/disconnect`, {});
  }
}
