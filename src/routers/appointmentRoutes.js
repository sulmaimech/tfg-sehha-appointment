import express from "express";
// Import controllers
import 
  postAppointemnt
//   updateAppointment,
//   getAppointment,
//   deleteAppointment,
 from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();

// routes
router
  .route("/")
  .post(makeExpressCallback(postAppointemnt))
//   .get(makeExpressCallback(getAppointment));
// router
//   .route("/:id")
//   .patch(makeExpressCallback(updateAppointment))
//   .get(makeExpressCallback(getAppointment))
//   .delete(makeExpressCallback(deleteAppointment));

export default router;
