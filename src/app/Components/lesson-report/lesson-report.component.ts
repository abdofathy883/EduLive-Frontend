import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-report',
  imports: [],
  templateUrl: './lesson-report.component.html',
  styleUrl: './lesson-report.component.css'
})
export class LessonReportComponent implements OnInit {
  currentUser: any = null;
  userRole: string = '';
  Reports: any[] = [];
  isLoading: boolean = false;

  pageSize = 10;
  currentPage = 1;
  private userSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('Current User:', this.currentUser);
    });

    const token = localStorage.getItem('token');
    
    if (!this.currentUser || !token) {
      this.router.navigate(['/login']);
      return;
    }

    if (
      Array.isArray(this.currentUser.roles) &&
      this.currentUser.roles.length > 0
    ) {
      debugger;
      this.userRole = this.currentUser.roles[0];
      console.log('user role:', this.userRole);

    }

    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedReports() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.Reports.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.Reports.length / this.pageSize);
  }


  submit(){
      console.log('user role:', this.userRole);

  }

}
