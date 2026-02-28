import { Component, inject, OnInit, signal } from '@angular/core';
import { TripService } from '../../services/Trip.service';
import { TripCard } from './trip-card/trip-card';
import { UserService } from '../../services/User.service';
import { AddTrip } from './add-trip/add-trip';

@Component({
  selector: 'app-all-trips',
  imports: [TripCard,AddTrip],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  private tripService = inject(TripService);
  private userService = inject(UserService);
  currentUser = this.userService.currentUser();
  isAdmin = this.currentUser?.isAdmin;
  trips = this.tripService.trips;

  canAddTtip = signal(false)

  ngOnInit() {
    this.tripService.getAllTrips(); 
    console.log(this.trips());
  }
  addTrip() {
    this.canAddTtip.update(val => !val);
  }
}
