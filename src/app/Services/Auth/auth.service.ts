import {
  RegisterInstructor,
  TokenPayload,
  UpdateUser,
  User,
  UserLogin,
} from './../../Models/User/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  first,
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
  private apiUrl = 'https://localhost:7090/api/auth';
  private endpoint = 'auth';
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'current_user';
  constructor(
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {
    this.initializeAuthState();
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn$ = this.loggedInSubject.asObservable();

  private initializeAuthState(): void {
    const token = this.getStoredToken();
    const user = this.getStoredUser();

    if (token && user && this.isTokenValid(token)) {
      this.setCurrentStatus(user);
    } else {
      this.clearAuthState();
    }
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles.includes(role) || false;
  }

  isStudent(): boolean {
    return this.hasRole('Student');
  }
  isInstructor(): boolean {
    return this.hasRole('Instructor');
  }

  register(registerData: RegisterStudent): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, registerData).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => error.error?.message || 'Registration failed');
      })
    );
  }

  registerInstructor(registerData: RegisterInstructor): Observable<User> {
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
      .post<User>(`${this.apiUrl}/register-instructor`, formData)
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

  GetUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user-by-id/${userId}`);
    // .pipe(
    //   tap(response => this.handleSuccessfulAuth(response)),
    //   catchError(this.handleError)
    // );
  }

  getInstructorById(instructorId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-instructor/${instructorId}`);
  }

  UpdateUserById(updatedUser: UpdateUser): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-user`, updatedUser);
    // .pipe(
    //   tap(response => this.handleSuccessfulAuth(response)),
    //   catchError(this.handleError)
    // );
  }

  getAuthorizationToken(): string | null {
    return this.getStoredToken();
  }

  getCurrentUser(): User | null {
    let currentUser = this.currentUserSubject.value;

    // If not available, try to get from localStorage and update BehaviorSubject
    if (!currentUser) {
      const storedUser = this.getStoredUser();
      const token = this.getStoredToken();

      if (storedUser && token && this.isTokenValid(token)) {
        this.currentUserSubject.next(storedUser);
        this.loggedInSubject.next(true);
        return storedUser;
      }
    }

    return currentUser;
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    return token !== null && this.isTokenValid(token);
  }

  refreshToken(): Observable<User> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<User>(`${this.apiUrl}/refresh`, { refreshToken })
      .pipe(
        tap((response) => this.handleSuccessfulAuth(response)),
        catchError((error) => {
          this.LogOut();
          return throwError(() => error);
        })
      );
  }

  private handleSuccessfulAuth(user: User): void {
    if (user.token) {
      this.storeToken(user.token);

      if (user.refreshToken) {
        this.storeRefreshToken(user.refreshToken);
      }
      this.setCurrentStatus(user);
    }
  }

  private setCurrentStatus(user: User): void {
    this.currentUserSubject.next(user);
    this.loggedInSubject.next(true);
    this.storeUser(user);
  }
  //   private http = inject(HttpClient);
  //   private router = inject(Router);
  //   private apiUrl = 'http://localhost:5153/api/Auth';

  //   private currentUserSubject = new BehaviorSubject<any>(null);
  //   currentUser$ = this.currentUserSubject.asObservable();

  //   private loggedInSubject = new BehaviorSubject<boolean>(false);
  //   isLoggedIn$ = this.loggedInSubject.asObservable();

  //   constructor() {
  //     // Initialize the BehaviorSubject with data from localStorage on service creation
  //     const savedUser = this.getCurrentUser();
  //     if (savedUser) {
  //       this.currentUserSubject.next(savedUser);
  //       this.loggedInSubject.next(true);
  //     }
  //   }

  //

  //   login(values: UserLogin): Observable<AuthResponse> {
  //     return this.http.post<AuthResponse>(this.apiUrl + '/login', values).pipe(
  //       map((response) => {
  //         if (response.isAuthenticated) {
  //           this.setCurrentStatus(response);
  //           return response;
  //         }
  //         throw new Error('Authentication failed');
  //       }),
  //       catchError((error) => {
  //         return throwError(() => error);
  //       })
  //     );
  //   }

  //   updateUser(userId: number, user: FormData): Observable<any> {
  //     return this.http.put<RegisterStudent>(`${this.apiUrl}/update-user?userid=${userId}`, user);
  //   }

  //   deleteUser(id: number): Observable<any> {
  //     return this.http.delete<any>(`${this.apiUrl}/delete-user/${id}`);
  //   }

  //   getAuthrizationToken(): string | null {
  //     return localStorage.getItem('token');
  //   }

  //   getCurrentUser(): any {
  //     try {
  //       const userStr = localStorage.getItem('user');
  //       if (!userStr) return null;
  //       return userStr ? JSON.parse(userStr) : null;
  //     } catch (error) {
  //       console.error('Error parsing user data from localStorage:', error);
  //       return null;
  //     }
  //   }

  //   setCurrentStatus(user: any): void {
  //     try {
  //       console.log('🧠 setCurrentStatus called with:', user);
  //       localStorage.setItem('user', JSON.stringify(user));
  //       localStorage.setItem('token', user.token);
  //       this.currentUserSubject.next(user);
  //     } catch (error) {
  //       console.error('Error setting current status:', error);
  //     }
  //   }

  //   // public get userValue(): User | null {
  //   //   return this.userSubject.value;
  //   // }

  //   // public isNurse(): boolean {
  //   //   return this.userValue?.role === 'Nurse';
  //   // }

  //   // public isPatient(): boolean {
  //   //   return this.userValue?.role === 'Patient';
  //   // }

  //   logOut() {
  //     localStorage.removeItem('user');
  //     this.currentUserSubject.next(null);
  //     this.loggedInSubject.next(false);
  //     this.router.navigate(['/login']);
  //   }

  private clearAuthState(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    this.loggedInSubject.next(false);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    console.log('Token stored:', token);
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
    console.log('Refresh token stored:', refreshToken);
  }

  private storeUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getStoredUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
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
