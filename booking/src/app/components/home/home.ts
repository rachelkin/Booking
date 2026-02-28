import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private userService = inject(UserService);
  currentUser = this.userService.currentUser();
  userName = this.currentUser?.name || "Unknown";
  
  logout() {
    this.userService.logout();
  }
}
