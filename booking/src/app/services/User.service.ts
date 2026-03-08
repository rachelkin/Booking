import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal, computed } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./Api.service";
import { User } from "../models/user_model"

@Injectable ({providedIn: 'root'})
export class UserService{
  private api = inject(ApiService);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  users = signal<User[]>([]);
  user = signal<User | null>(null);
  currentUser = signal<User | null>(null);
  loginError = signal<string>('');
  
  constructor() {
    this.loadCurrentUser();
  }
  
  private loadCurrentUser() {
    try {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        this.currentUser.set(JSON.parse(userJson));
      }
    } catch (error) {
      console.error('Failed to load current user:', error);
    }
  }
login(username: string, password: string) {
    this.loginError.set('');
    try {
      this.http.get<User[]>(`${this.api.BASE_URL}/users?name=${username}&password=${password}`)
        .subscribe({
          next: (data) => {
            if (data.length > 0) {
              // ✅ המשתמש קיים - התחברות מוצלחת
              localStorage.setItem('user', JSON.stringify(data[0]));
              this.currentUser.set(data[0]);
              this.router.navigate(['/home/allTrips']);
            } else {
              // ❌ המשתמש לא קיים - צריך להירשם
              this.loginError.set('המשתמש לא קיים במערכת. עליך להירשם תחילה.');
            }
          },
          error: (error) => {
            console.error('Failed to login:', error);
            this.loginError.set('שגיאה בהתחברות. נסה שוב.');
          }
        });
    } catch (error) {
      console.error('Error during login:', error);
      this.loginError.set('אירעה שגיאה. נסה שוב.');
    }
   
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
  
  allUsers(){
    try{
      this.http.get<User[]>(`${this.api.BASE_URL}/users`)
          .subscribe({
            next: (data) => {
              this.users.set(data);
            },
            error:(error)=>{
              console.error('Failed to show users', error);
            }
      });
    }
    catch(error){
      console.error('Error fetching users:', error);
    }    
  }

  userById(idUser: string){
    try{
      this.http.get<User[]>(`${this.api.BASE_URL}/users/${idUser}`)
          .subscribe({
            next: (data) => {
              this.user.set(data[0]);
            },
            error:(error)=>{
              console.error('Failed to show user by id', error);
            }
      });
    }
    catch(error){
      console.error('Error fetching users :', error);
    }    
  }

  checkUserExists(username: string) {
    return this.http.get<User[]>(`${this.api.BASE_URL}/users?name=${username}`);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.api.BASE_URL}/users`);
  }

  addUser(newUser: User){
      try{
        this.http.post<User>(`${this.api.BASE_URL}/users`,newUser)
          .subscribe({
            next:addedUser => {
              this.users.update(current => [...current, addedUser]);
          },
          error:(err)=>{
            console.error('Failed to add user', err);
          }
        });
      }
      catch(error){
        console.error('Error fetching users:', error);
      } 
  }

}


