import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../../services/Trip.service';
import { Router } from '@angular/router';
import { Trip } from '../../../models/trip_model';

@Component({
  selector: 'app-add_and_edit',
  imports: [FormsModule],
  templateUrl: './add_and_edit.html',
  styleUrl: './add_and_edit.css',
})
export class Add_and_edit {
  private tripService = inject(TripService);
  private router = inject(Router);
  
  name = '';
  destination = '';
  startDate = '';
  endDate = '';
  price: number | null = null;
  description = '';
  image = '';
  errorMessage = signal('');

  addTrip() {
    this.errorMessage.set('');
    
    if (!this.name || !this.destination || !this.startDate || !this.endDate || !this.price || !this.description || !this.image) {
      this.errorMessage.set('All fields are required');
      return;
    }
    
    if (this.price <= 0) {
      this.errorMessage.set('Price must be greater than 0');
      return;
    }
    
    if (new Date(this.startDate) >= new Date(this.endDate)) {
      this.errorMessage.set('End date must be after start date');
      return;
    }

    this.tripService.getAllTrips().subscribe(trips => {
      const newId = String(trips.length + 1);
      
      const newTrip: Trip = {
        id: newId,
        name: this.name,
        destination: this.destination,
        startDate: this.startDate,
        endDate: this.endDate,
        price: this.price!,
        description: this.description,
        image: this.image
      };

      this.tripService.postAddTrip(newTrip).subscribe({
        next: () => {
          this.router.navigate(['/home/allTrips']);
        },
        error: () => {
          this.errorMessage.set('Failed to add trip');
        }
      });
    });
  }
  
  cancel() {
    this.router.navigate(['/home/allTrips']);
  }
}
