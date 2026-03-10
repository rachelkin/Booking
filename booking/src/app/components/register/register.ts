import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/User.service';
import { User } from '../../models/user_model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);
  
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

      this.userService.checkUserExists(this.username)
        .subscribe({
          next: (data) => {
            if (data.length > 0) {
              this.errorMessage.set('המשתמש כבר קיים במערכת. מעבר לדף התחברות...');
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);         
            } else {
              this.userService.getAllUsers()
                .subscribe({
                  next: (allUsers) => {
                    const maxId = allUsers.length > 0 
                      ? Math.max(...allUsers.map(u => parseInt(u.id))) 
                      : 0;
                    
                    const newUser: User = {
                      id: (maxId + 1).toString(),
                      name: this.username,
                      email: this.email,
                      password: this.password,
                      isAdmin: false
                    };
                    
                    this.userService.addUser(newUser);
                    this.successMessage.set('נרשמת בהצלחה! מעבר לדף הבית...');
                    localStorage.setItem('user', JSON.stringify(newUser));
                    this.userService.currentUser.set(newUser);
                    this.router.navigate(['/home']);
                  },
                  error: (error) => {
                    console.error('Failed to get users:', error);
                    this.errorMessage.set('שגיאה בקבלת נתונים. נסה שוב.');
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
