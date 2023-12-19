import axios from "axios";

import Weather from "../models/weather.model";

class WeatherAPIServices {
  public async requestWeather(destination: string) {
    const url: string = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${destination}&days=7&aqi=no&alerts=no`;

    const response = await axios.get(url);
    const daysResponses = response.data.forecast.forecastday;

    const weather: Weather[] = [];

    daysResponses.map(
      (d: {
        date: string;
        day: {
          maxtemp_c: string;
          mintemp_c: string;
          avgtemp_c: string;
          maxwind_mph: string;
          totalprecip_mm: string;
          uv: string;
        };
      }) =>
        weather.push(
          new Weather(
            d.date,
            d.day.maxtemp_c,
            d.day.mintemp_c,
            d.day.avgtemp_c,
            d.day.maxwind_mph,
            d.day.totalprecip_mm,
            d.day.uv
          )
        )
    );

    return weather;
  }
}

export const weatherAPIServices = new WeatherAPIServices();
export default weatherAPIServices;
