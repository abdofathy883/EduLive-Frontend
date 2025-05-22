import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  imports: [],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  private fb = inject(FormBuilder);
  loading: boolean = false;

  constructor(private authService: AuthService) { }
}
