import googleFlightServices from "./googleFlight.services";
import weatherAPIServices from "./weatherAPI.services";

class FlightsServices {
  public async getFlights(origin: string, destination: string) {
    try {
      const flights = googleFlightServices.startScrapping(origin, destination);
      const weather = weatherAPIServices.requestWeather(destination);

      const result = await Promise.all([weather, flights]);

      return { weather: result[0], flights: result[1] };
    } catch (e) {
      return null;
    }
  }
}

export const flightsServices = new FlightsServices();
export default flightsServices;
