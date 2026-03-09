import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingService } from '../../services/Booking.service';
import { UserService } from '../../services/User.service';
import { TripCard } from '../all-trips/trip-card/trip-card';
import { TripService } from '../../services/Trip.service';
import { Trip } from '../../models/trip_model';
import { Booking } from '../../models/booking_model';


@Component({
  selector: 'app-my-trips',
  imports: [TripCard],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
})
export class MyTrips implements OnInit {

  bookingService = inject(BookingService);
  tripService = inject(TripService);
  userService = inject(UserService);

  user = this.userService.currentUser();

  myBookings = signal<Booking[]>([]);
  myTrips = signal<Trip[]>([]);

  ngOnInit() {
    if (!this.user) return;
    
    this.bookingService.getBookingsByUserId(this.user.id)
      .subscribe(bookings  => {
        this.myBookings.set(bookings );    
        const ids = bookings.map(b => b.tripId);
        const uniqueIds = [...new Set(ids)];

        uniqueIds.forEach(id => {
          this.tripService.getTripByID(String(id))
            .subscribe(trip => {
              this.myTrips.update(current => [...current, trip]);
            });
      });
    });
  }
}