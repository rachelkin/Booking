import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/Trip.service';
import { BookingService } from '../../services/Booking.service';
import { RouterLink } from '@angular/router';
import { Trip as TripModel } from '../../models/trip_model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-trip',
  imports: [RouterLink, FormsModule],
  templateUrl: './trip.html',
  styleUrl: './trip.css',
})
export class Trip implements OnInit {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripService);
  private bookingService = inject(BookingService);
  private userService = inject(UserService);
  currentTrip = signal<TripModel | null>(null);
  bookingsCount = signal<number>(0);
  numberOfPeople = signal<number>(1);
  errorMessage = signal<string>('');

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const tripId = params.get('id');
    if (tripId) {
      this.tripService.getTripByID(tripId)
        .subscribe(trip => {
          this.currentTrip.set(trip);
        });
      this.loadBookings(tripId);
    }
  });

}

  loadBookings(tripId: string): void {
    this.bookingService.getNumberOfRegistrations(tripId).subscribe(bookings => {
      this.bookingsCount.set(bookings.reduce((sum, b) => sum + b.people, 0));
    });
  }

  register(): void {
    this.errorMessage.set('');
    const people = this.numberOfPeople();
    
    if (people < 1) {
      this.errorMessage.set('Number of people must be at least 1');
      return;
    }
    
    if (people > 10) {
      this.errorMessage.set('Number of people cannot exceed 10');
      return;
    }

    const tripId = this.route.snapshot.paramMap.get('id');
    if (!tripId) return;

    const currentUser = this.userService.currentUser();
    const userID = this.userService.currentUser()?.id;
    if (!currentUser) {
      this.errorMessage.set('Please login to register');
      return;
    }

    this.bookingService.getAllBookings().subscribe(bookings => {
      const newId = String(bookings.length + 1);

      const newbooking = {
        id: newId,
        tripId: Number(tripId),
        userId: Number(currentUser.id),
        people: people
      };

      this.bookingService.addBooking(newbooking).subscribe({
        next: () => {
          this.errorMessage.set('Registration completed successfully!');
          this.numberOfPeople.set(1);
          this.loadBookings(tripId);
        },
        error: () => {
          this.errorMessage.set('Registration error, please try again');
        }
      });
    });
  }
}
