import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { Flight, FlightComponent } from './flight/flight.component';
import { Weather, WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlightComponent,
    WeatherComponent,
    MatTabsModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.weather = [];
    this.flights = [];
  }

  loading = false;

  form = {
    origin: '',
    destination: '',
  };

  originSearch = '';
  destinationSearch = '';

  weather: Weather[];
  flights: Flight[];

  async sendForm(form: NgForm) {
    // Reset
    this.originSearch = '';
    this.destinationSearch = '';
    this.weather = [];
    this.flights = [];

    if (form.valid) {
      this.loading = true;
      try {
        this.http
          .get<{
            weather: Weather[];
            flights: Flight[];
          }>(
            `http://localhost:3000/v1/flights?origin=${form.value.origin}&destination=${form.value.destination}`
          )
          .subscribe((data) => {
            if (data) {
              this.originSearch = this.form.origin;
              this.destinationSearch = this.form.destination;
              this.weather = data.weather;
              this.flights = data.flights;
            } else this.snackBar.open('Scrapping Failed', 'Ok');

            this.loading = false;
          });
      } catch (e) {
        this.snackBar.open('Request Failed', 'Ok');
        this.loading = false;
      }
    }
  }
}
