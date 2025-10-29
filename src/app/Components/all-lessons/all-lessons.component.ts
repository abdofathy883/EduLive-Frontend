import { Component, OnInit } from '@angular/core';
import { MeetService } from '../../Services/GoogleMeet/meet-service.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { ZoomService } from '../../Services/Zoom/zoom.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-lessons',
  imports: [],
  templateUrl: './all-lessons.component.html',
  styleUrl: './all-lessons.component.css',
})
export class AllLessonsComponent implements OnInit {
  currentUser: any = null;
  userRole: string = '';
  currentUserId: string = '';

  lessons: any[] = [];
  meetLessons: any[] = [];
  zoomLessons: any[] = [];

  constructor(
    private authService: AuthService,
    private meetService: MeetService,
    private zoomService: ZoomService
  ) {}
  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.authService.getById(this.currentUserId).subscribe({
      next: (response) => {
        this.currentUser = response;
      }
    })
    this.loadLessons();
  }

  loadLessons() {
    const isStudent = this.authService.isStudent();
    const isInstructor = this.authService.isInstructor();
    if (isInstructor) {
      this.meetService
        .GetMeetingsByInstructorId(this.currentUser.id)
        .subscribe({
          next: (res) => {
            this.meetLessons = res;
          },
          error: (err) => console.error('Error fetching meetings:', err),
        });

      this.zoomService
        .GetMeetingsByInstructorId(this.currentUser.id)
        .subscribe({
          next: (res) => {
            this.zoomLessons = res;
          },
          error: (err) => console.error('Error fetching meetings:', err),
        });

      this.lessons = [...this.meetLessons, ...this.zoomLessons];
    }

    if (isInstructor) {
      this.meetService.GetMeetingsByStudentId(this.currentUser.id).subscribe({
        next: (res) => {
          this.meetLessons = res;
        },
        error: (err) => console.error('Error fetching meetings:', err),
      });

      this.zoomService.GetMeetingsByStudentId(this.currentUser.id).subscribe({
        next: (res) => {
          this.zoomLessons = res;
        },
        error: (err) => console.error('Error fetching meetings:', err),
      });
      this.lessons = [...this.meetLessons, ...this.zoomLessons];
    }
  }
}
