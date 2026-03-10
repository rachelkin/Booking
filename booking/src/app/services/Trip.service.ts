import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./Api.service";
import { Trip } from "../models/trip_model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TripService {

  private api = inject(ApiService);
  private http = inject(HttpClient);

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.api.BASE_URL}/trips`
    );
  }

  getTripByID(idTrip: string): Observable<Trip> {
    return this.http.get<Trip>(
      `${this.api.BASE_URL}/trips/${idTrip}`
    );
  }

  postAddTrip(newTrip: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      `${this.api.BASE_URL}/trips`,
      newTrip
    );
  }

  putTripByID(idTrip: string, updatedTrip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.api.BASE_URL}/trips/${idTrip}`,
      updatedTrip
    );
  }

  deleteTripByID(idTrip: string): Observable<Trip> {
    return this.http.delete<Trip>(
      `${this.api.BASE_URL}/trips/${idTrip}`
    );
  }

}