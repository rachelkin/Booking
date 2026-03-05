import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/Trip.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip',
  imports: [ RouterLink],
  templateUrl: './trip.html',
  styleUrl: './trip.css',
})
export class Trip implements OnInit {
  private route = inject(ActivatedRoute);
  tripService = inject(TripService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.tripService.getTripByID(Number(id));
    }
  }
}
