import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
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
    if (!form.valid) return;

    this.userService.login(form.value.username, form.value.password)
      .subscribe({
        next: (users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('user', JSON.stringify(user));
            this.userService.currentUser.set(user);
            this.router.navigate(['/home/allTrips']);
          } else {
            this.userService.loginError.set('המשתמש לא קיים במערכת. עליך להירשם תחילה.');
          }
        },
        error: () => {
          this.userService.loginError.set('שגיאה בהתחברות. נסה שוב.');
        }
      });
  }
}
