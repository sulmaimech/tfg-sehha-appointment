import express from "express";
// Import controllers
import 
   { postAppointment, 
    postSpeciality
//   updateAppointment,
//   getAppointment,
//   deleteAppointment,
   } from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();
console.log(typeof(postAppointment))
// routes
router
  .route("/specialties")
  .post(makeExpressCallback(postSpeciality))
  
  
  router.route("/appointments")
  .post(makeExpressCallback(postAppointment))
//   .get(makeExpressCallback(getAppointment));
// router
//   .route("/:id")
//   .patch(makeExpressCallback(updateAppointment))
//   .get(makeExpressCallback(getAppointment))
//   .delete(makeExpressCallback(deleteAppointment));

export default router;
