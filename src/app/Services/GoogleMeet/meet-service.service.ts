import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class MeetService {
  constructor(private api: ApiService) {}
  private apiUrl = 'meet';

  CreateMeetLesson(meetingData: any): Observable<any> {
    return this.api.post(`${this.apiUrl}/create`, meetingData);
  }

  GetMeetingById(meetingId: string): Observable<any> {
    return this.api.get(`${this.apiUrl}/${meetingId}`);
  }

  GetMeetingsByCourseId(courseId: string): Observable<any[]> {
    return this.api.get<any[]>(`${this.apiUrl}/course/${courseId}`);
  }

  GetMeetingsByInstructorId(instructorId: string): Observable<any[]> {
    return this.api.get<any[]>(`${this.apiUrl}/instructor/${instructorId}`);
  }

  GetMeetingsByStudentId(studentId: string): Observable<any[]> {
    return this.api.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }
}
