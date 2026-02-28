import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = ''
  login(){
    localStorage.setItem('user', JSON.stringify(this.user));
  }

}
