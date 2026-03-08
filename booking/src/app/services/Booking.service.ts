import { HttpClient } from "@angular/common/http";
import { inject, Injectable ,signal} from "@angular/core";
import { ApiService } from "./Api.service";
import { Booking } from "../models/booking_model"
import { map } from "rxjs/internal/operators/map";
import { Observable } from "rxjs/internal/Observable";
import { TripService } from "./Trip.service";
import { Trip } from "../models/trip_model";

@Injectable ({providedIn: 'root'})

export class BookingService{
  private api = inject(ApiService);
  private http = inject(HttpClient);
  private tripService = inject(TripService);
  bookings = signal<Booking[]>([]); 

  allBookingByUserId(userId: string) {
    const myTrips: Trip[] = [];
    this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings?userId=${userId}`)
      .subscribe(bookings => {
        let ids = bookings.map(b => b.tripId);
        ids = [...new Set(ids)];
        ids.forEach(id => {
          this.tripService.getTripByID(String(id))
            .subscribe(trip => {
              myTrips.push(trip);
            });
        });
      });

    return myTrips;
  }

  addBooking(newBooking: Booking){
    try{
      this.http.post<Booking>(`${this.api.BASE_URL}/bookings`,newBooking)
        .subscribe({
          next:addedBooking => {
        this.bookings.update(current => [...current, addedBooking]);
        },
        error:(err)=>{
          console.error('Failed to add booking', err);
        }
      });
    }
    catch(error){
      console.error('Error fetching bookings:', error);
    } 
  }

  getNumberOfRegistrations(tripId: string): Observable<number> {
    return this.http.get<Booking[]>(this.api.BASE_URL + '/bookings' + `?tripId=${tripId}`).pipe(
      map(bookings => {    
        return bookings.reduce((sum, booking) => sum + booking.people, 0);
      })
    );
  }
}
