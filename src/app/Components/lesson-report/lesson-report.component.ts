import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { User } from '../../Models/User/user';
import { ReportsService } from '../../Services/reports/reports.service';

@Component({
  selector: 'app-lesson-report',
  imports: [],
  templateUrl: './lesson-report.component.html',
  styleUrl: './lesson-report.component.css',
})
export class LessonReportComponent implements OnInit {
  currentUser!: User;
  reports!: any[];
  isLoading: boolean = false;
  isStudent: boolean = false;
  isInstructor: boolean = false;
  currentUserId: string = '';

  // pageSize = 10;
  // currentPage = 1;

  constructor(
    private authService: AuthService, 
    private reportService: ReportsService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.authService.getById(this.currentUserId).subscribe({
      next: (response) => {
        this.currentUser = response;
      }
    })
    this.authService.isStudent().subscribe((student) => {
      if (student) {
        this.isStudent = true
      }
    });
    this.authService.isInstructor().subscribe((instructor) => {
      if (instructor) {
        this.isInstructor = true
      }
    })

    this.loadReports();
  }

  loadReports() {
    if (!this.currentUser) {
      console.error('No current user found');
      return;

    }
    if (this.isStudent) {
      this.reportService.getAllByStudentId(this.currentUser.userId).subscribe({
        next: (reports) => {
          this.reports = reports as any[];
          console.log('Student reports fetched successfully:', this.reports);
        },
        error: (error) => {
          console.error('Error fetching student reports:', error);
        }
      });
    }

    if (this.isInstructor) {
      this.reportService.getAllByInstructorId(this.currentUser.userId).subscribe({
        next: (reports) => {
          this.reports = reports as any[];
          console.log('Instructor reports fetched successfully:', this.reports);
        },
        error: (error) => {
          console.error('Error fetching instructor reports:', error);
        }
      });
  }
}

  // changePage(page: number) {
  //   this.currentPage = page;
  // }

  // pageNumbers(): number[] {
  //   return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }

  // get pagedReports() {
  //   const start = (this.currentPage - 1) * this.pageSize;
  //   return this.reports.slice(start, start + this.pageSize);
  // }

  // get totalPages() {
  //   return Math.ceil(this.reports.length / this.pageSize);
  // }

  submit() {
    console.log('user role:', this.currentUser?.roles[0]);
  }
}
