import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  userForm!: FormGroup;
  userFormData!: FormData;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    this.userFormData = new FormData();
    this.userFormData.append('firstName', this.userForm.value.firstName);
    this.userFormData.append('lastName', this.userForm.value.lastName);
    this.userFormData.append('email', this.userForm.value.email);
    this.userFormData.append('phone', this.userForm.value.phone);
    this.userFormData.append('password', this.userForm.value.password);
    this.authService.updateUser(this.userFormData).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
