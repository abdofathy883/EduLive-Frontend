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

  lessons: any[] = [];
  meetLessons: any[] = [];
  zoomLessons: any[] = [];

  constructor(
    private authService: AuthService,
    private meetService: MeetService,
    private zoomService: ZoomService
  ) {}
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    if (
      Array.isArray(this.currentUser.roles) &&
      this.currentUser.roles.length > 0
    ) {
      this.userRole = this.currentUser.roles[0];
    }

    this.loadLessons();
  }

  loadLessons() {
    if (this.userRole[0] == 'Instructor') {
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

    if (this.userRole[0] == 'Student') {
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
