import { Component, inject, input, output, signal } from '@angular/core';
import { Trip } from "../../../models/trip_model"
import { UserService } from '../../../services/User.service';
import { TripService } from '../../../services/Trip.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  private userService = inject(UserService);
  private tripService = inject(TripService);
  currentUser = this.userService.currentUser();
  isAdmin = this.currentUser?.isAdmin;
  trip = input<Trip>();
  toDelete = signal<boolean>(false);
  deleted = output<string>();
  
  deleteTrip(){
   const id = this.trip()?.id;
    if (!id) return;
    this.tripService.deleteTripByID(id).subscribe(() => {
      this.deleted.emit(id); // מעדכן את האב סיגנלית
    });
  }

}
