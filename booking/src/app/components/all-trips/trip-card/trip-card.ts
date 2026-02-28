import { Component, input } from '@angular/core';
import { Trip } from "../../../models/trip_model"

@Component({
  selector: 'app-trip-card',
  imports: [],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  trip = input<Trip>();
}
