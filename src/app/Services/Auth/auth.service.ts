import {
  AuthResponse,
  RegisterInstructor,
  UserLogin,
} from './../../Models/User/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  first,
  map,
  Observable,
  throwError,
} from 'rxjs';
import { RegisterStudent } from '../../Models/User/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:5153/api/Auth';

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor() {
    // Initialize the BehaviorSubject with data from localStorage on service creation
    const savedUser = this.getCurrentUser();
    if (savedUser) {
      this.currentUserSubject.next(savedUser);
      this.loggedInSubject.next(true);
    }
  }

  register(registerData: RegisterStudent): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, registerData)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(
            () => error.error?.message || 'Registration failed'
          );
        })
      );
  }

  registerInstructor(
    registerData: RegisterInstructor
  ): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('firstName', registerData.firstName);
    formData.append('lastName', registerData.lastName);
    formData.append('email', registerData.email);
    formData.append('phoneNumber', registerData.phoneNumber);
    formData.append('password', registerData.password);
    formData.append('confirmPassword', registerData.password);
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
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register-instructor`, formData)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        }),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => error.error?.message || 'Registration failed'
          );
        })
      );
  }

  login(values: UserLogin): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/login', values).pipe(
      map((response) => {
        if (response.isAuthenticated) {
          this.setCurrentStatus(response);
          return response;
        }
        throw new Error('Authentication failed');
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  updateUser(user: FormData): Observable<any> {
    return this.http.put<RegisterStudent>(`${this.apiUrl}/update-user`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-user/${id}`);
  }

  getAuthrizationToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }

  setCurrentStatus(user: any): void {
    try {
      console.log('🧠 setCurrentStatus called with:', user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error setting current status:', error);
    }
  }

  // public get userValue(): User | null {
  //   return this.userSubject.value;
  // }

  // public isNurse(): boolean {
  //   return this.userValue?.role === 'Nurse';
  // }

  // public isPatient(): boolean {
  //   return this.userValue?.role === 'Patient';
  // }

  logOut() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
