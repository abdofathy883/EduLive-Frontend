import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateUser } from '../../Models/User/user';
import { th } from 'intl-tel-input/i18n';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  loading: boolean = false;
  updateForm!: FormGroup;
  currentUser: UpdateUser | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm() {
    this.updateForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      phoneNumber: [''],
      password: ['', [Validators.minLength(6)]],
    });
  }

  loadUserData() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.updateForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber || '',
        });
      }
    })
    // this.authService.getCurrentUser().subscribe({
    //   next: (user: UpdateUser) => {
    //     this.currentUser = user;
    //     // Populate form with current user data
    //     this.updateForm.patchValue({
    //       firstName: user.firstName,
    //       lastName: user.lastName,
    //       email: user.email,
    //       phoneNumber: user.phoneNumber || '',
    //     });
    //     this.loading = false;
    //   },
    //   error: (error: Error) => {
    //     console.error('Error loading user data:', error);
    //     this.loading = false;
    //   },
    // });
  }

  onSubmit() {
    this.loading = true;
    if (this.updateForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;

    const updateData: FormData = new FormData();
    updateData.append('firstName', this.updateForm.value.firstName);
    updateData.append('lastName', this.updateForm.value.lastName);
    updateData.append('email', this.updateForm.value.email);
    updateData.append('phoneNumber', this.updateForm.value.phoneNumber);
    updateData.append('password', this.updateForm.value.password);

    this.authService.updateUser(updateData).subscribe({
      next: () => {
        this.successMessage = 'تم تحديث البيانات بنجاح';
        this.loading = false;
        alert('User updated successfully');
      },
      error: (error: Error) => {
        this.errorMessage = 'حدث خطأ أثناء تحديث البيانات, يرجى المحاولة مرة أخرى';
        console.error('Error updating user:', error);
        this.loading = false;
      },
    });
  }
}
