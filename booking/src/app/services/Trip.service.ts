import { HttpClient } from "@angular/common/http";
import { inject, Injectable ,signal} from "@angular/core";
import { ApiService } from "./Api.service";
import { Trip } from "../models/trip_model"

@Injectable ({providedIn: 'root'})
export class TripService{
  private api = inject(ApiService);
  private http = inject(HttpClient);
  trips = signal<Trip[]>([]);    

  getAllTrips() {
    this.http.get<Trip[]>(`${this.api.BASE_URL}/trips`)
      .subscribe(data => {
        this.trips.set(data);
      });
  }

  getTripByID(idTrip:Number){
        this.http.get<Trip[]>(`${this.api.BASE_URL}/trips?id=${idTrip}`)
        .subscribe(data=>{
            this.trips.set(data);
        });
  }

  postAddTrip(newTrip: Trip) {
        this.http.post<Trip>(`${this.api.BASE_URL}/trips`,newTrip)
        .subscribe(addedTrip => {
      this.trips.update(current => [...current, addedTrip]);
    });
  }
  
 putTripByID(idTrip: number, updatedTrip: Trip) {
  this.http.put<Trip>(`${this.api.BASE_URL}/trips/${idTrip}`, updatedTrip)
    .subscribe(putedTrip => {
      this.trips.update(current =>
        current.map(trip => trip.id === putedTrip.id ? putedTrip : trip)
      );
    });
}

  deleteTripByID(idTrip: number) {
    this.http.delete<Trip>(`${this.api.BASE_URL}/trips/${idTrip}`)
      .subscribe(() => {
        this.trips.update(current => current.filter(trip => trip.id !== idTrip));
      });
  }
}





