import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   private UserLoggedIn = localStorage.getItem('user');
   userName = this.UserLoggedIn ? JSON.parse(this.UserLoggedIn).name : "Unknown";
}
