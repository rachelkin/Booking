import { Component, inject, input, output, signal } from '@angular/core';
import { Trip } from "../../../models/trip_model"
import { UserService } from '../../../services/User.service';
import { TripService } from '../../../services/Trip.service';
import { BookingService } from '../../../services/Booking.service';
import { Router, RouterLink } from "@angular/router";

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
  private router = inject(Router);

  deleted = output<string>();
  trip = input<Trip>();

  currentUser = this.userService.currentUser();
  isAdmin = this.currentUser?.isAdmin; 
  toDelete = signal<boolean>(false);
  messageToDelete = signal<string>('');
  messageToEdit = signal<string>('');
  
  deleteTrip(){
    const id = this.trip()?.id;
    if (!id) return;

    this.bookingService.getNumberOfRegistrations(this.trip()?.id||"").subscribe((registrations) => {
      if (registrations.length === 0) {
        this.tripService.deleteTripByID(id).subscribe(() => {
          this.deleted.emit(id);
        });
      } else {
        this.messageToDelete.set('Cannot delete trip with existing registrations.');
      }
    });
  }

  EditTrip(){
    const id = this.trip()?.id;
    if (!id) return;

    this.bookingService.getNumberOfRegistrations(this.trip()?.id||"").subscribe((registrations) => {
      if (registrations.length === 0) {
        this.router.navigate(['/home/add_and_edit'], { queryParams: { id } }); 
      } else {
        this.messageToEdit.set('Cannot edit  trip with existing registrations.');
        setTimeout(() => {
          this.messageToEdit.set('');
        }, 1500);
      }
    });
  }
}