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
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
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
    // debugger;
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

      this.authService.Login(loginData).subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/my-account']);
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
