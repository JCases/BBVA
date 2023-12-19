import puppeteer, { Browser } from "puppeteer";

class ScrappingServices {
  private browser?: Browser;

  constructor() {
    this.createBrowser().then((browser) => (this.browser = browser));
  }

  private async createBrowser() {
    const browser = await puppeteer.launch();
    return browser;
  }

  public async getPage() {
    const page = await this.browser!.newPage();
    return page;
  }
}

export const scrapping = new ScrappingServices();
