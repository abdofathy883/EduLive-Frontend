import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterInstructor } from '../../Models/User/user';
import intlTelInput from 'intl-tel-input';
@Component({
  selector: 'app-careers',
  imports: [ReactiveFormsModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;
  instructorForm!: FormGroup;
  loading: boolean = false;

  private cvFile!: File;
  private introVideoFile!: File;

  iti: any;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (field === 'CV') {
        this.cvFile = file;
        // this.instructorForm.patchValue({ CV: file });
      } else if (field === 'introVideo') {
        this.introVideoFile = file;
        // this.instructorForm.patchValue({ introVideo: file });
      }
    }
  }

  ngOnInit(): void {
    this.instructorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: [''],
      bio: [''],
      CV: [null],
      introVideo: [null],
      password: ['', Validators.required],
      confirmPassword: [''],
    });
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
      this.instructorForm.patchValue({
        phone: this.iti?.getNumber(),
      });
    });
  }

  onSubmit() {
    // debugger;
    this.loading = true;
    if (this.instructorForm.invalid) {
      this.loading = false;
      return;
    }
    const registerForm: RegisterInstructor = {
      firstName: this.instructorForm.value.firstName,
      lastName: this.instructorForm.value.lastName,
      email: this.instructorForm.value.email,
      phoneNumber: this.instructorForm.value.phoneNumber,
      dateOfBirth: this.instructorForm.value.dateOfBirth,
      bio: this.instructorForm.value.bio,
      CV: this.cvFile,
      introVideo: this.introVideoFile,
      password: this.instructorForm.value.password,
      confirmPassword: this.instructorForm.value.password,
    };
    console.log(registerForm);
    this.authService.registerInstructor(registerForm).subscribe({
      next: (response) => {
        console.log(response);
        alert('Your application has been submitted successfully');
        this.instructorForm.reset();
        this.loading = false;
        // Handle success response
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        alert('An error occurred while submitting your application');
        // Handle error response
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
