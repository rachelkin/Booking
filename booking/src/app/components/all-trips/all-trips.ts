import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { TripService } from '../../services/Trip.service';
import { TripCard } from './trip-card/trip-card';
import { UserService } from '../../services/User.service';
import { Trip } from '../../models/trip_model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-trips',
  imports: [TripCard, FormsModule],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  private tripService = inject(TripService);
  private userService = inject(UserService);
  private router = inject(Router);
  currentUser = this.userService.currentUser();
  isAdmin = this.currentUser?.isAdmin;
  allTrips = signal<Trip[]>([]);
  
  filterDestination = signal('');
  filterDate = signal('');
  sortBy = signal('');

  trips = computed(() => {
    let filtered = [...this.allTrips()];
    
    if (this.filterDestination()) {
      filtered = filtered.filter(t => t.destination.toLowerCase().includes(this.filterDestination().toLowerCase()));
    }
    
    if (this.filterDate()) {
      filtered = filtered.filter(t => t.startDate === this.filterDate());
    }
    
    if (this.sortBy() === 'date') {
      filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } else if (this.sortBy() === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    }
    
    return filtered;
  });

  ngOnInit() {
     this.tripService.getAllTrips().subscribe(trips => {
      this.allTrips.set(trips);
    }); 
  }
  
  addTrip() {
    this.router.navigate(['/home/add_and_edit']);
  }

  onTripDeleted(deletedId: string) {
   this.tripService.getAllTrips().subscribe(trips => {
      this.allTrips.set(trips);
    });
  }
}
