import { Component, inject, input, output, signal } from '@angular/core';
import { Trip } from "../../../models/trip_model"
import { UserService } from '../../../services/User.service';
import { TripService } from '../../../services/Trip.service';
import { Router, RouterLink } from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  private userService = inject(UserService);
  private tripService = inject(TripService);
  private location = inject(Location);
  private router = inject(Router);
  currentUser = this.userService.currentUser();
  isAdmin = this.currentUser?.isAdmin;
  trip = input<Trip>();
  toDelete = signal<boolean>(false);
  deleted = output<string>();
  
  deleteTrip(){
    const id = this.trip()?.id;
    if (!id) return;

    this.tripService.deleteTripByID(id).subscribe({
      next: () => {
        this.deleted.emit(id); 
        this.location.back(); 
      },
      error: () => {
        console.error('Failed to delete trip');
      }
    });
  }

  addTrip(){
    const id = this.trip()?.id;
    if (id) {
      this.router.navigate(['/home/add_and_edit'], { queryParams: { id } });
    }
     this.router.navigate(['/home/add_and_edit']);


  }
}