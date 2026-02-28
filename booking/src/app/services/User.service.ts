import { HttpClient } from "@angular/common/http";
import { inject, Injectable ,signal} from "@angular/core";
import { ApiService } from "./Api.service";
import { User } from "../models/user_model"

@Injectable ({providedIn: 'root'})
export class UserService{
  private api = inject(ApiService);
  private http = inject(HttpClient);
  users = signal<User[]>([]);
  user = signal<User | null>(null);
  
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
      this.http.get<User[]>(`${this.api.BASE_URL}/users?id=${idUser}`)
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


