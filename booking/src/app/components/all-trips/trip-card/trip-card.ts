import { Component, inject, input } from '@angular/core';
import { Trip } from "../../../models/trip_model"
import { UserService } from '../../../services/User.service';
import { TripService } from '../../../services/Trip.service';

@Component({
  selector: 'app-trip-card',
  imports: [],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  private userService = inject(UserService);
  currentUser = this.userService.currentUser();
  isAdmin = this.currentUser?.isAdmin;

  private tripService = inject(TripService);

  trip = input<Trip>();

  deleteTrip(){
    console.log("delete trip");
    
    // const trip = this.trip();
    // if (trip?.id) {
    //   this.tripService.deleteTripByID(trip.id);
    // }
  }
}
