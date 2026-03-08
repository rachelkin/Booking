import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/Trip.service';
import { RouterLink } from '@angular/router';
import { Trip as TripModel } from '../../models/trip_model';

@Component({
  selector: 'app-trip',
  imports: [ RouterLink],
  templateUrl: './trip.html',
  styleUrl: './trip.css',
})
export class Trip implements OnInit {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripService);
  currentTrip = signal<TripModel | null>(null);

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripService.getTripByID(tripId).subscribe(trip => {
        this.currentTrip.set(trip);
      });
    }
  }
}
