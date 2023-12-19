import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

export interface Weather {
  id: string;
  maxTemperature: string;
  minTemperature: string;
  avgTemperature: string;
  maxWind: string;
  totalPrecipitation: string;
  uv: string;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  @Input() date: string = '';
  @Input() maxTemperature: string = '';
  @Input() minTemperature: string = '';
  @Input() avgTemperature: string = '';
  @Input() maxWind: string = '';
  @Input() totalPrecipitation: string = '';
  @Input() uv: string = '';
}
