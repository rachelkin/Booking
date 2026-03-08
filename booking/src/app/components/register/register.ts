import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/User.service';
import { User } from '../../models/user_model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/Api.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);
  private http = inject(HttpClient);
  private api = inject(ApiService);
  
  username = '';
  email = '';
  password = '';
  verifyPassword = '';
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  register(form: NgForm) {
    if (form.valid) {
      this.errorMessage.set('');
      this.successMessage.set('');
      
      if (this.password !== this.verifyPassword) {
        this.errorMessage.set('הסיסמאות אינן תואמות');
        return;
      }

      this.http.get<User[]>(`${this.api.BASE_URL}/users?name=${this.username}`)
        .subscribe({
          next: (data) => {
            if (data.length > 0) {
              this.errorMessage.set('המשתמש כבר קיים במערכת. מעבר לדף התחברות...');
              this.router.navigate(['/login']);
            } else {
              const newUser: User = {
                id: Date.now().toString(),
                name: this.username,
                email: this.email,
                password: this.password,
                isAdmin: false
              };
              
              this.http.post<User>(`${this.api.BASE_URL}/users`, newUser)
                .subscribe({
                  next: (addedUser) => {
                    this.successMessage.set('נרשמת בהצלחה! מעבר לדף הבית...');
                    localStorage.setItem('user', JSON.stringify(addedUser));
                    this.userService.currentUser.set(addedUser);
                    this.router.navigate(['/home/allTrips']);
                  },
                  error: (error) => {
                    console.error('Failed to add user:', error);
                    this.errorMessage.set('שגיאה ביצירת המשתמש. נסה שוב.');
                  }
                });
            }
          },
          error: (error) => {
            console.error('Failed to check user:', error);
            this.errorMessage.set('שגיאה בבדיקת המשתמש. נסה שוב.');
          }
        });
    }
  }
}
