import express from "express";
//import controllers
import {
  postAppointemnt,
  updateAppointment,
  getAppointment,
} from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();

// routes
router
  .route("/")
  .post(makeExpressCallback(postAppointemnt))
  .get(makeExpressCallback(getAppointment));
router
  .route("/:id")
  .patch(makeExpressCallback(updateAppointment))
  .get(makeExpressCallback(getAppointment));

export default router;
