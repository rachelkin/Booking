import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./Api.service";
import { User } from "../models/user_model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class UserService {

  private api = inject(ApiService);
  private http = inject(HttpClient);
  private router = inject(Router);

  users = signal<User[]>([]);
  user = signal<User | null>(null);
  currentUser = signal<User | null>(null);

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser() { 
      const userJson = localStorage.getItem('user');
      if (userJson) {
        this.currentUser.set(JSON.parse(userJson));
      }
  }

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.api.BASE_URL}/users?name=${username}&password=${password}`
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  allUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api.BASE_URL}/users`);
  }

  userById(idUser: string): Observable<User> {
    return this.http.get<User>(`${this.api.BASE_URL}/users/${idUser}`);
  }

  checkUserExists(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.api.BASE_URL}/users?name=${username}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api.BASE_URL}/users`);
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.api.BASE_URL}/users`, newUser);
  }

}