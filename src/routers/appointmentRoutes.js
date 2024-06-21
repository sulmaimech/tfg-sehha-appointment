import express from "express";
import { authenticateToken, authorizeRoles } from '../utils/middlewares/authMiddleware.js';
// Import controllers
import 
   { postAppointment, 
    postSpeciality, 
    getSpecialities, 
    deleteSpeciality, 
    getSpecialityById, 
    updateASpeciality, 
    getUser, 
    getUsers, 
    getSpecialists,
    getSpecialistById, 
    getSchedule, 
    postNewTimeSlots, 
    putScheduleSlot,
    deleteTimeSlot, 
    deleteAppointment,
    getAppointments, 
    getAppointment
   } from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();

// Middleware to verify token authentication
router.use(authenticateToken);

// routes
router
  .route("/specialties")
  .post(authorizeRoles("specialist"),makeExpressCallback(postSpeciality))
  .get(authorizeRoles("user", "specialist"),makeExpressCallback(getSpecialities));

router
  .route("/specialties/:id")
  .delete(authorizeRoles("specialist"),makeExpressCallback(deleteSpeciality))
  .get(authorizeRoles("user", "specialist"),makeExpressCallback(getSpecialityById))
  .put(authorizeRoles("specialist"),makeExpressCallback(updateASpeciality));

router.route("/users/:id")
      .get(authorizeRoles("user", "specialist"), makeExpressCallback(getUser))
  

router.route("/users")
      .get(authorizeRoles("specialist"),makeExpressCallback(getUsers))

router.route("/specialists")
      .get(authorizeRoles("user"),makeExpressCallback(getSpecialists))

router.route("/specialists/:id")
      .get(authorizeRoles("user", "specialist"), makeExpressCallback(getSpecialistById))
  
router.route("/specialists/:id/schedule")
      .get(authorizeRoles("user", "specialist"),makeExpressCallback(getSchedule))
      .post(authorizeRoles("specialist"),makeExpressCallback(postNewTimeSlots))
      .put(authorizeRoles("specialist"), makeExpressCallback(putScheduleSlot))
      .delete(authorizeRoles("specialist"), makeExpressCallback(deleteTimeSlot))
  
  router.route("/appointments")
  .post(authorizeRoles("user", "specialist"), makeExpressCallback(postAppointment))
  .get(authorizeRoles("user", "specialist"), makeExpressCallback(getAppointments))

router.route("/appointments/:id")
      .get(authorizeRoles("user", "specialist"), makeExpressCallback(getAppointment))
      .delete(authorizeRoles("user", "specialist"), makeExpressCallback(deleteAppointment))

export default router;
