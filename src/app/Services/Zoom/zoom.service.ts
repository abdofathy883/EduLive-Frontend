import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ZoomMeeting, CreateZoomMeetingRequest, UpdateZoomMeetingRequest, ZoomUserConnection } from '../../Models/Zoom/zoom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private apiUrl = '';
  constructor(private http: HttpClient) { }

  createZoomMeeting(meetingData: CreateZoomMeetingRequest): Observable<ZoomMeeting> {
    return this.http.post<ZoomMeeting>(`${this.apiUrl}/add-new-zoom-lesson`, meetingData);
  }

  updateZoomMeeting(meetingId: string, meeting: UpdateZoomMeetingRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${meetingId}`, meeting);
  }

  GetMeetingById(meetingId: string): Observable<ZoomMeeting> {
    return this.http.get<ZoomMeeting>(`${this.apiUrl}/get-zoom-meeting/${meetingId}`);
  }

  GetMeetingsByCourseId(courseId: string): Observable<ZoomMeeting[]> {
    return this.http.get<ZoomMeeting[]>(`${this.apiUrl}/get-meetings-by-course/${courseId}`);
  }

  GetMeetingsByInstructorId(instructorId: string): Observable<ZoomMeeting[]> {
    return this.http.get<ZoomMeeting[]>(`${this.apiUrl}/get-meetings-by-instructor/${instructorId}`);
  }

  GetMeetingsByStudentId(studentId: string): Observable<ZoomMeeting[]> {
    return this.http.get<ZoomMeeting[]>(`${this.apiUrl}/get-meetings-by-student/${studentId}`);
  }
}
