import { HttpClient } from "@angular/common/http";
import { inject, Injectable ,signal} from "@angular/core";
import { ApiService } from "./Api.service";
import { Booking } from "../models/booking_model"
import { map } from "rxjs/internal/operators/map";
import { Observable } from "rxjs";

@Injectable ({providedIn: 'root'})

export class BookingService{
  private api = inject(ApiService);
  private http = inject(HttpClient);
  bookings = signal<Booking[]>([]); 

  allBooking(){
    try{
      this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings`)
          .subscribe({
            next: (data) => {
              this.bookings.set(data);
            },
            error:(err)=>{
              console.error('Failed to show bookings', err);
            }
      });
    }
    catch(error){
      console.error('Error fetching bookings:', error);
    }    
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