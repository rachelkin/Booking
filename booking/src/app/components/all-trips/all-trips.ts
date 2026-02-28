import { Component, inject, OnInit } from '@angular/core';
import { TripService } from '../../services/Trip.service';
import { TripCard } from './trip-card/trip-card';

@Component({
  selector: 'app-all-trips',
  imports: [TripCard],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  private tripService = inject(TripService);

  trips = this.tripService.trips;

  ngOnInit() {
    this.tripService.getAllTrips(); 
    console.log(this.trips());
  }
}
