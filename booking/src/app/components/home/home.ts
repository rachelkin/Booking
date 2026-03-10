import { Component, inject, signal, effect } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private userService = inject(UserService);
  private router = inject(Router);
  currentUser = this.userService.currentUser;
  userName = this.currentUser()?.name || 'Guest';
  ifHomeAndMore = signal(true);
  
  onActivate() {
    this.ifHomeAndMore.set(false);
  }
  
  onDeactivate() {
    this.ifHomeAndMore.set(true);
  }
  
  logout() {
    this.userService.logout();
     this.router.navigate(['/login']);
  }
}
