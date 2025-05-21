import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../../Models/User/user';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loading: Boolean = false;

  loginForm!: FormGroup;
  loginFormData!: FormData;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    try {
      this.loading = true;
      const loginData: UserLogin = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isAuthenticated) {
            localStorage.setItem('token', response.token);
            const currentUser = {
              id: response.userId,
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              roles: response.roles,
              dateOfBirth: response.dateOfBirth,
              phoneNumber: response.phoneNumber,
              bio: response.bio,
              CV: response.CV,
              introVideo: response.introVideo,
            };
            localStorage.setItem('user', JSON.stringify(currentUser));
            this.authService.setCurrentStatus(currentUser);
            this.router.navigate(['/my-account']);
          } else {
            console.log('Authentication failed');
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loading = false;
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
