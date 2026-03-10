import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./Api.service";
import { Booking } from "../models/booking_model";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class BookingService {

  private api = inject(ApiService);
  private http = inject(HttpClient);

  getBookingsByUserId(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings?userId=${userId}`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings`);
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.api.BASE_URL}/bookings`, newBooking);
  }

  getBookingsByTripId(tripId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings?tripId=${tripId}`);
  }

  getNumberOfRegistrations(tripId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.api.BASE_URL}/bookings?tripId=${tripId}`);
  }

 idsBookingsToDelete(userId: string, tripId: string): Observable<string[]> {
  return this.http
    .get<any[]>(`${this.api.BASE_URL}/bookings?userId=${userId}&tripId=${tripId}`)
    .pipe(
      map(bookings => bookings.map(b => b.id))
    );
  }

  deleteBooking(bookingId: string): Observable<void> {
    return this.http.delete<void>(`${this.api.BASE_URL}/bookings/${bookingId}`);
  }

}