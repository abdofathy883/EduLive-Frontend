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
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  loading: boolean = false;
  updateForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  currentUser: any | null = null;
  currentUserId: string = '';
  constructor(
    private authService: AuthService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.currentUserId = this.authService.getCurrentUserId();
    this.authService.getById(this.currentUserId).subscribe({
      next: (response) => {
        this.currentUser = response;
      }
    })
    this.patchValues();
  }

  initializeForm() {
    this.updateForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      password: [''],
      cv: [null],
      introVideo: [null],
      bio: [''],
      concurrencyStamp: [''],
    });
  }

  patchValues() {
      this.updateForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        phoneNumber: this.currentUser.phoneNumber,
        password: '',
        bio: this.currentUser.bio,
        concurrencyStamp: this.currentUser.concurrencyStamp,
      });
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
    updateData.append('bio', this.updateForm.value.bio);
    updateData.append('concurrencyStamp', this.currentUser.concurrencyStamp);

    // this.authService.updateUser(this.currentUser.id, updateData).subscribe({
    //   next: () => {
    //     this.successMessage = 'تم تحديث البيانات بنجاح';
    //     this.loading = false;
    //     this.currentUser.concurrencyStamp = this.updateForm.value.concurrencyStamp;
    //     // Update the current user in the AuthService
    //     alert('User updated successfully');
    //   },
    //   error: (error: Error) => {
    //     this.errorMessage =
    //       'حدث خطأ أثناء تحديث البيانات, يرجى المحاولة مرة أخرى';
    //     console.error('Error updating user:', error);
    //     this.loading = false;
    //   },
    // });
  }
}
