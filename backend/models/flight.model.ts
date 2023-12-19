export default class Flight {
  public id: string;
  public price: string;
  public dateDeparture: string;
  public dateReturn: string;
  public airline: string;

  constructor(
    id: string,
    price: string,
    dateDeparture: string,
    dateReturn: string,
    airline: string
  ) {
    this.id = id;
    this.price = price;
    this.dateDeparture = dateDeparture;
    this.dateReturn = dateReturn;
    this.airline = airline;
  }
}
