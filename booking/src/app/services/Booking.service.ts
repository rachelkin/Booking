import { HttpClient } from "@angular/common/http";
import { inject, Injectable ,signal} from "@angular/core";
import { ApiService } from "./Api.service";
import { Booking } from "../models/booking_model"
import { map } from "rxjs/internal/operators/map";
// import { Observable } from "rxjs/internal/Observable";
import { TripService } from "./Trip.service";
import { Trip } from "../models/trip_model";
import { Observable } from "rxjs";

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

  getAllBookings(): Observable<Booking[]> {
    try{
      return this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings`);
    }
    catch(error){
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    try{
      return this.http.post<Booking>(`${this.api.BASE_URL}/bookings`,newBooking);
    }
    catch(error){
      console.error('Error fetching bookings:', error);
      throw error;
    } 
  }
  
  getBookingsByTripId(tripId: string) {
    return this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings?tripId=${tripId}`);
  }
  
  
  getNumberOfRegistrations(tripId: string): Observable<Booking[]> {
    try{
      return this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings?tripId=${tripId}`);
    }
    catch(error){
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }
}
