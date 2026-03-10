import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../services/Trip.service';
import { BookingService } from '../../services/Booking.service';
import { Location } from '@angular/common';
import { Trip } from '../../models/trip_model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add_and_edit',
  imports: [FormsModule],
  templateUrl: './add_and_edit.html',
  styleUrls: ['./add_and_edit.css'],
})
export class Add_and_edit implements OnInit {
  private tripService = inject(TripService);
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  @Input() id !: string;
  name = signal<string>('');
  destination = signal<string>('');
  startDate = signal<string>('')  ;
  endDate = signal<string>('');
  price = signal<number>(0);
  description = signal<string>('');
  image = signal<string>('');
  errorMessage = signal<string>('');

  ngOnInit() { 
      if (this?.id) {
        this.loadTripData(this?.id);
      }
  }

  loadTripData(id: string) {
    this.tripService.getTripByID(id).subscribe({
      next: (trip) => {
        this.name.set(trip.name);
        this.destination.set(trip.destination);
        this.startDate.set(trip.startDate);
        this.endDate.set(trip.endDate);
        this.price.set(trip.price);
        this.description.set(trip.description);
        this.image.set(trip.image);
      },
      error: () => {
        this.errorMessage.set('Failed to load trip data');
      }
    });
  }

  addOrEditTrip() {
    this.errorMessage.set('');

    if (!this.name || !this.destination || !this.startDate || !this.endDate || !this.price || !this.description || !this.image) {
      this.errorMessage.set('All fields are required');
      return;
    }

    if (this.price() <= 0) {
      this.errorMessage.set('Price must be greater than 0');
      return;
    }

    if (new Date(this.startDate()) >= new Date(this.endDate())) {
      this.errorMessage.set('End date must be after start date');
      return;
    }

    if (this?.id) {
      this.editTrip();
    }      
    else {
      this.addTrip();
    }
    
  }

  addTrip() {
     this.tripService.getAllTrips().subscribe({
        next: (trips) => {
          const newId = (trips.length + 1).toString();

          const newTrip: Trip = {
            id: newId,
            name: this.name(),
            destination: this.destination(),
            startDate: this.startDate(),
            endDate: this.endDate(),
            price: this.price(),
            description: this.description(),
            image: this.image()
          };

          this.tripService.postAddTrip(newTrip).subscribe({
            next: () => {
              this.location.back();
            },
            error: () => {
              this.errorMessage.set('Failed to add trip');
            }
          });
        },
        error: () => {
          this.errorMessage.set('Failed to load trips');
        }
      });
  }

  editTrip() {
      const updatedTrip: Trip = {
            id: this.id,
            name: this.name(),
            destination: this.destination(),
            startDate: this.startDate(),
            endDate: this.endDate(),
            price: this.price(),
            description: this.description(),
            image: this.image()
          };

          this.tripService.putTripByID(this.id, updatedTrip).subscribe({
            next: () => {
              this.location.back();
            },
            error: () => {
              this.errorMessage.set('Failed to update trip');
            }
          });
  }

  cancel() {
    this.location.back();
  }

}