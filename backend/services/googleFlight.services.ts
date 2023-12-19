import { Page } from "puppeteer";

import { scrapping } from "./scrapping.services";

import Flight from "../models/flight.model";

class GoogleFlightServices {
  public async startScrapping(origin: string, destination: string) {
    const page = await scrapping.getPage();

    await page.setRequestInterception(true);

    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      )
        req.abort();
      else req.continue();
    });

    page.goto("https://www.google.com/travel/flights?hl=es-ES&curr=EUR", {
      waitUntil: "networkidle0",
    });

    await this.selectInfo(page, origin, destination);
    return await this.selectData(page);
  }

  private async selectData(page: Page) {
    /*const containerSortBy = await page.waitForSelector('div[jsname="MGQ7Hf"]');
    const optionsSortBy = await containerSortBy!.$$("li");
    await optionsSortBy[1].click();*/

    await page.locator(".Rk10dc").wait();
    const flightsList = await page.$$(".Rk10dc");

    const flightsData = await flightsList[1].$$("li");
    flightsData.pop(); //Remove last element

    const flights: Flight[] = [];

    for (const f of flightsData) {
      const dataContainer = await f.waitForSelector(".Ir0Voe");
      const priceContainer = await f.waitForSelector(".U3gSDe");

      const timesContainer = await dataContainer!.waitForSelector(
        ".zxVSec.YMlIz.tPgKwe.ogfYpf"
      );
      const airlineContainer = await dataContainer!.waitForSelector(
        ".sSHqwe.tPgKwe.ogfYpf"
      );

      const spansTimes = await timesContainer!.$$("span");
      const spansAirline = await airlineContainer!.$$("span");
      const spansPrice = await priceContainer!.$$("span");

      // Times
      const dateDeparture = await (
        await spansTimes[2].getProperty("innerText")
      ).jsonValue();
      const dateReturn = await (
        await spansTimes[7].getProperty("innerText")
      ).jsonValue();
      const airline = await (
        await spansAirline[0].getProperty("innerText")
      ).jsonValue();

      const price = await (
        await spansPrice[0].getProperty("innerText")
      ).jsonValue();

      flights.push(
        new Flight(
          flights.length + "",
          price,
          dateDeparture,
          dateReturn,
          airline
        )
      );
    }

    await page.close();

    return flights;
  }

  private async selectInfo(page: Page, origin: string, destination: string) {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    const dateOrigin = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    date.setDate(date.getDate() + 7);

    const dateDestination = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    // Decline Consent Google

    const url = await page.evaluate(() => location.href);

    if (url.startsWith("https://consent.google.com/"))
      await page.locator(".lssxud").click();

    // Origin and Destination
    await page.locator(".e5F5td").wait();
    const inputsLocation = await page.$$(".e5F5td");

    await inputsLocation[0].click({ count: 3, delay: 50 });
    await page.keyboard.type(origin, { delay: 150 });

    await page.keyboard.press("Enter");

    await inputsLocation[1].click({ delay: 50 });
    await page.keyboard.type(destination, { delay: 150 });

    await page.keyboard.press("Enter");

    // Date
    const dateInput = await page.waitForSelector(".FMXxAd");
    await dateInput!.click({ delay: 150 });
    const inputsDates = await page.$$(".FMXxAd");

    await inputsDates[2].click({ delay: 50 });
    await page.keyboard.type(dateOrigin, { delay: 150 });

    await inputsDates[3].click({ delay: 50 });
    await page.keyboard.type(dateDestination, { delay: 150 });

    await page.waitForSelector(".qxcyof");

    const dateConfirm = await page.waitForSelector(".VfPpkd-RLmnJb");
    await dateConfirm!.click();

    // Search
    const buttonSearch = await page.waitForSelector('button[jsname="vLv7Lb"]');
    await buttonSearch!.click();
  }
}

export const googleFlightServices = new GoogleFlightServices();
export default googleFlightServices;
