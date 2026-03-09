import { Component, inject, input, output, signal } from '@angular/core';
import { Trip } from "../../../models/trip_model"
import { UserService } from '../../../services/User.service';
import { TripService } from '../../../services/Trip.service';
import { RouterLink } from "@angular/router";
import { BookingService } from '../../../services/Booking.service';

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  private userService = inject(UserService);
  private tripService = inject(TripService);
  private bookingService = inject(BookingService);
  isTripRegistered = output<boolean>();
  currentUser = this.userService.currentUser();
  isAdmin = this.currentUser?.isAdmin;
  trip = input<Trip>();

  deleteTrip(){
    console.log("delete trip");
  }


}
