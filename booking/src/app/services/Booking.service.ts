import { HttpClient } from "@angular/common/http";
import { inject, Injectable ,signal} from "@angular/core";
import { ApiService } from "./Api.service";
import { Booking } from "../models/booking_model"

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
}
