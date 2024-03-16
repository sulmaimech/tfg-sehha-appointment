import express from "express";
// Import controllers
import 
   { postAppointment, 
    postSpeciality, 
    getSpecialities, 
    deleteSpeciality, 
    getSpecialityById, 
    updateASpeciality, 
    getUser, 
    getSpecialists,
    getSpecialistById, 
    getSchedule, 
    postNewTimeSlots, 
    putScheduleSlot,
    deleteTimeSlot, 
    deleteAppointment,
    getAppointments
   } from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();
console.log(typeof(postAppointment))
// routes
router
  .route("/specialties")
  .post(makeExpressCallback(postSpeciality))
  .get(makeExpressCallback(getSpecialities));

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
      .delete(makeExpressCallback(deleteTimeSlot))
  
  router.route("/appointments")
  .post(makeExpressCallback(postAppointment))
  .get(makeExpressCallback(getAppointments))

router.route("/appointments/:id")
      .delete(makeExpressCallback(deleteAppointment))



export default router;
