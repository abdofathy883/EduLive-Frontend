import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  Validator,
} from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { RegisterStudent } from '../../Models/User/user';
import { th } from 'intl-tel-input/i18n';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  loading: boolean = false;

  registrationForm!: FormGroup;
  registerFormData!: FormData;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      // confirmPassword: ['', Validators.required],
      dateOfBirth: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.registrationForm.invalid) {
      this.loading = false;
      return;
    }

    try {
      const registerData: RegisterStudent = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        phoneNumber: this.registrationForm.value.phoneNumber,
        password: this.registrationForm.value.password,
        // confirmPassword: this.registrationForm.value.password, // Assuming confirmPassword is same as password
        dateOfBirth: this.registrationForm.value.dateOfBirth,
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.loading = false;
          if (response) {
            console.log("Registered successfully:", response);
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error("Registration failed:", error);
          this.loading = false;
        },
      });
    } catch (error) {
      console.error("An error occurred:", error);
      this.loading = false;
    }
  }
}
