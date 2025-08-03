import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private endpoint = 'lessonreport';
  constructor(private api: ApiService) { }

  getAllByStudentId(studentId: string) {
    return this.api.get(`${this.endpoint}/student-reports/${studentId}`);
  }

  getAllByInstructorId(instructorId: string) {
    return this.api.get(`${this.endpoint}/instructor-reports/${instructorId}`);
  }

  create(report: any) {
    return this.api.post(`${this.endpoint}`, report);
  }
}
