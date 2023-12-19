import express from "express";

import "./services/scrapping.services";

import routes from "./routes";
import cors from "cors";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.routes();
  }

  private routes() {
    this.app.use("/v1", routes);
  }
}
const app = new App();
export default app.app;
