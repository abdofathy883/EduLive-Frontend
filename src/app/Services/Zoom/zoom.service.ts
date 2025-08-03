import { Injectable } from '@angular/core';
import { ZoomMeeting, CreateZoomMeetingRequest, UpdateZoomMeetingRequest, ZoomUserConnection } from '../../Models/Zoom/zoom';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private apiUrl = 'zoom';
  constructor(private api: ApiService) { }

  createZoomMeeting(meetingData: CreateZoomMeetingRequest): Observable<ZoomMeeting> {
    return this.api.post<ZoomMeeting>(`${this.apiUrl}/add-new-zoom-lesson`, meetingData);
  }

  updateZoomMeeting(meetingId: string, meeting: UpdateZoomMeetingRequest): Observable<void> {
    return this.api.put<void>(`${this.apiUrl}/${meetingId}`, meeting);
  }

  GetMeetingById(meetingId: string): Observable<ZoomMeeting> {
    return this.api.get<ZoomMeeting>(`${this.apiUrl}/get-zoom-meeting/${meetingId}`);
  }

  GetMeetingsByCourseId(courseId: string): Observable<ZoomMeeting[]> {
    return this.api.get<ZoomMeeting[]>(`${this.apiUrl}/get-meetings-by-course/${courseId}`);
  }

  GetMeetingsByInstructorId(instructorId: string): Observable<ZoomMeeting[]> {
    return this.api.get<ZoomMeeting[]>(`${this.apiUrl}/get-meetings-by-instructor/${instructorId}`);
  }

  GetMeetingsByStudentId(studentId: string): Observable<ZoomMeeting[]> {
    return this.api.get<ZoomMeeting[]>(`${this.apiUrl}/get-meetings-by-student/${studentId}`);
  }
}
