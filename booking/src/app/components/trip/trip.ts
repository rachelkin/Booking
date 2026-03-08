import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/Trip.service';
import { RouterLink } from '@angular/router';
import { Trip as tripmodel} from '../../models/trip_model';

@Component({
  selector: 'app-trip',
  imports: [ RouterLink],
  templateUrl: './trip.html',
  styleUrl: './trip.css',
})
export class Trip implements OnInit {
  private route = inject(ActivatedRoute);
  tripService = inject(TripService);

  ngOnInit(): void {
    this.tripService.getAllTrips();
  }
}
