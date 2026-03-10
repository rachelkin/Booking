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
  
  username = signal<string>('');
  password = signal<string>('');
  errorMessage = signal<string>('');

 login(form: NgForm) {
    if (!form.valid) return;

    this.userService.login(form.value.username, form.value.password)
      .subscribe({
        next: (users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('user', JSON.stringify(user));
            this.userService.currentUser.set(user);
            this.router.navigate(['/home']);
          } else {
            this.errorMessage.set("שם המשתמש או הסיסמה שגויים. נסה שוב.");
          }
        },
        error: () => {
          this.errorMessage.set('שגיאה בהתחברות. נסה שוב.');
        }
      });
  }
}
