import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private userService = inject(UserService);
  
  username = '';
  password = '';
  errorMessage = this.userService.loginError;

  login(form: NgForm) {
    if (form.valid) {
      this.userService.login(form.value.username, form.value.password);
    }
  }
}
