import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

export interface Flight {
  id: string;
  price: string;
  dateDeparture: string;
  dateReturn: string;
  airline: string;
}

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css',
})
export class FlightComponent {
  @Input() origin: string = '';
  @Input() destination: string = '';
  @Input() dateDeparture: string = '';
  @Input() dateReturn: string = '';
  @Input() price: string = '';
  @Input() airline: string = '';
}
