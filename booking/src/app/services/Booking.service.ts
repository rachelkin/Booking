import { Injectable ,signal} from "@angular/core";

@Injectable ({providedIn: 'root'})
export class BookingService{
  bookings = signal<string[]>([]);    
}