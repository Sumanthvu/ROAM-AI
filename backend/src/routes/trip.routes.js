import {
  saveTriplan,
  getMySavedTrips,
  unSaveTrip,
} from "../controllers/trip.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.use(verifyJWT);

router.route("/").post(saveTriplan);
router.route("/").get(getMySavedTrips);

router.route("/:tripId").delete(unSaveTrip);

export default router;
