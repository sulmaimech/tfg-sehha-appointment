import express from "express";
// Import controllers
import 
   { postAppointment, 
    postSpeciality, 
    getSpeciality, 
    deleteSpeciality, 
    getSpecialityById, 
    updateASpeciality, 
    getUser, 
    getSpecialists,
    getSpecialistById, 
    getSchedule, 
    postNewTimeSlots, 
    putScheduleSlot
   } from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();
console.log(typeof(postAppointment))
// routes
router
  .route("/specialties")
  .post(makeExpressCallback(postSpeciality))
  .get(makeExpressCallback(getSpeciality));

router
  .route("/specialties/:id")
  .delete(makeExpressCallback(deleteSpeciality))
  .get(makeExpressCallback(getSpecialityById))
  .put(makeExpressCallback(updateASpeciality));

router.route("/users/:id")
      .get(makeExpressCallback(getUser))
  

router.route("/specialists")
      .get(makeExpressCallback(getSpecialists))

router.route("/specialists/:id")
      .get(makeExpressCallback(getSpecialistById))
  
router.route("/specialists/:id/schedule")
      .get(makeExpressCallback(getSchedule))
      .post(makeExpressCallback(postNewTimeSlots))
      .put(makeExpressCallback(putScheduleSlot))
  
  router.route("/appointments")
  .post(makeExpressCallback(postAppointment))
//   .get(makeExpressCallback(getAppointment));
// router
//   .route("/:id")
//   .patch(makeExpressCallback(updateAppointment))
//   .get(makeExpressCallback(getAppointment))
//   .delete(makeExpressCallback(deleteAppointment));

export default router;
