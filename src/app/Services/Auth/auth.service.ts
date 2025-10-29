import {
  RegisterInstructor,
  TokenPayload,
  UpdateUser,
  User,
  UserLogin,
} from './../../Models/User/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { RegisterStudent } from '../../Models/User/user';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth';
  private readonly tokenKey = 'auth_token';
  private readonly userIdKey = 'current_user';
  constructor(private router: Router, private api: ApiService) {
    this.initializeAuthState();
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn$ = this.loggedInSubject.asObservable();

  private initializeAuthState(): void {
    const token = this.getStoredToken();
    const user = this.getStoredUserId();

    if (token && user && this.isTokenValid(token)) {
      this.loggedInSubject.next(true);
    } else {
      this.clearAuthState();
    }
  }

  hasRole(role: string): Observable<boolean> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      return new Observable((observer) => observer.next(false));
    }

    return this.getById(userId).pipe(
      map((user) => user.roles.includes(role)),
      catchError(
        () => new Observable<boolean>((observer) => observer.next(false))
      )
    );
  }

  isStudent(): Observable<boolean> {
    return this.hasRole('Student');
  }
  isInstructor(): Observable<boolean> {
    return this.hasRole('Instructor');
  }

  register(registerData: RegisterStudent): Observable<User> {
    return this.api
      .post<User>(`${this.endpoint}/register-student`, registerData)
      .pipe(catchError(this.handleError));
  }

  registerInstructor(registerData: RegisterInstructor): Observable<User> {
    const formData = new FormData();
    formData.append('firstName', registerData.firstName);
    formData.append('lastName', registerData.lastName);
    formData.append('email', registerData.email);
    formData.append('phoneNumber', registerData.phoneNumber);
    formData.append('password', registerData.password);
    if (registerData.dateOfBirth) {
      formData.append('dateOfBirth', registerData.dateOfBirth.toString());
    }
    if (registerData.bio) {
      formData.append('bio', registerData.bio);
    }
    if (registerData.CV) {
      formData.append('cvPath', registerData.CV, registerData.CV.name);
    }
    if (registerData.introVideo) {
      formData.append(
        'videoPath',
        registerData.introVideo,
        registerData.introVideo.name
      );
    }
    return this.api
      .post<User>(`${this.endpoint}/register-instructor`, formData)
      .pipe(catchError(this.handleError));
  }

  Login(login: UserLogin): Observable<User> {
    // debugger;
    return this.api.post<User>(`${this.endpoint}/login`, login).pipe(
      tap((response) => this.handleSuccessfulAuth(response)),
      catchError(this.handleError)
    );
  }

  LogOut(): void {
    this.clearAuthState();
    this.router.navigate(['/login']);
  }

  getById(userId: string): Observable<User> {
    return this.api.get<User>(`${this.endpoint}/get-user-by-id/${userId}`);
    // .pipe(
    //   tap(response => this.handleSuccessfulAuth(response)),
    //   catchError(this.handleError)
    // );
  }

  getInstructorById(instructorId: string): Observable<User> {
    return this.api.get<User>(
      `${this.endpoint}/get-instructor/${instructorId}`
    );
  }

  UpdateUserById(updatedUser: UpdateUser): Observable<User> {
    return this.api.put<User>(`${this.endpoint}/update-user`, updatedUser);
    // .pipe(
    //   tap(response => this.handleSuccessfulAuth(response)),
    //   catchError(this.handleError)
    // );
  }

  getAuthorizationToken(): string | null {
    return this.getStoredToken();
  }

  getCurrentUserId(): string {
    let userId = localStorage.getItem('user_Id');
    if (!userId) {
      return '';
    }
    return userId;
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const userId = this.getCurrentUserId();
    return token !== null && userId != '' && this.isTokenValid(token);
  }

  // refreshToken(): Observable<User> {
  //   const refreshToken = localStorage.getItem('refresh_token');
  //   if (!refreshToken) {
  //     return throwError(() => new Error('No refresh token available'));
  //   }

  //   return this.http
  //     .post<User>(`${this.apiUrl}/refresh`, { refreshToken })
  //     .pipe(
  //       tap((response) => this.handleSuccessfulAuth(response)),
  //       catchError((error) => {
  //         this.LogOut();
  //         return throwError(() => error);
  //       })
  //     );
  // }

  private handleSuccessfulAuth(user: User): void {
    if (user.token) {
      this.storeToken(user.token);
      this.storeUserId(user.userId);
      if (user.refreshToken) {
        this.storeRefreshToken(user.refreshToken);
      }
      this.setCurrentStatus(user);
    }
  }

  private setCurrentStatus(user: User): void {
    this.currentUserSubject.next(user);
    this.loggedInSubject.next(true);
  }

  private clearAuthState(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    this.loggedInSubject.next(false);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  }

  private storeUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getStoredUserId(): string {
    let userId = localStorage.getItem(this.userIdKey);
    return userId || '';
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  private decodeToken(token: string): TokenPayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid credentials';
          this.LogOut();
          break;
        case 403:
          errorMessage = 'Access denied';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = error.error?.message || `Error Code: ${error.status}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  };
}
