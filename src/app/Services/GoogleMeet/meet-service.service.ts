import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MeetService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://api.tahfezquran.com/api/meet';

  CreateMeetLesson(meetingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, meetingData);
  }

  GetMeetingById(meetingId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${meetingId}`);
  }

  GetMeetingsByCourseId(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}`);
  }

  GetMeetingsByInstructorId(instructorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/instructor/${instructorId}`);
  }

  GetMeetingsByStudentId(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }
}
