export default class Weather {
  public id: string;
  public maxTemperature: string;
  public minTemperature: string;
  public avgTemperature: string;
  public maxWind: string;
  public totalPrecipitation: string;
  public uv: string;

  constructor(
    id: string,
    maxTemperature: string,
    minTemperature: string,
    avgTemperature: string,
    maxWind: string,
    totalPrecipitation: string,
    uv: string
  ) {
    this.id = id;
    this.maxTemperature = maxTemperature;
    this.minTemperature = minTemperature;
    this.avgTemperature = avgTemperature;
    this.maxWind = maxWind;
    this.totalPrecipitation = totalPrecipitation;
    this.uv = uv;
  }
}
