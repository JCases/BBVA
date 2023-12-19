import { NextFunction, Request, Response, Router } from "express";

import flightsServices from "../services/flights.services";

export class FlightsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private getFlights(req: Request, res: Response, next: NextFunction) {
    const { origin, destination } = req.query as {
      origin: string;
      destination: string;
    };
    if (!origin || !destination) return res.json({ error: { code: 404 } });

    flightsServices
      .getFlights(origin, destination)
      .then((r) => res.json(r))
      .catch(next);
  }

  private init() {
    this.router.get("/", this.getFlights);
  }
}

const authRouter = new FlightsRouter();
export default authRouter.router;
