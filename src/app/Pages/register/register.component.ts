import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { RegisterStudent } from '../../Models/User/user';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;

  loading: boolean = false;

  registrationForm!: FormGroup;
  registerFormData!: FormData;
  iti: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.iti) {
      this.iti.destroy();
    }
  }

  ngAfterViewInit(): void {
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'eg',
      geoIpLookup: (callback) => {
        fetch('https://ipinfo.io/json?token=<d8dae8adf4e32d>')
          .then((res) => res.json())
          .then((res) => callback(res.country))
          .catch((err) => console.error(err));
      },
      // @ts-ignore
      utilsScript: 'assets/utils.js',
    });
    this.phoneInput.nativeElement.addEventListener('countrychange', () => {
      this.registrationForm.patchValue({
        phone: this.iti?.getNumber(),
      });
    });
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
    // debugger;
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
            console.log('Registered successfully:', response);
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.loading = false;
        },
      });
    } catch (error) {
      console.error('An error occurred:', error);
      this.loading = false;
    }
  }
}
