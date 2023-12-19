import { Router } from "express";

import FlightsRoutes from "./flights.routes";

const router = Router();
router.use("/flights", FlightsRoutes);

export default router;
