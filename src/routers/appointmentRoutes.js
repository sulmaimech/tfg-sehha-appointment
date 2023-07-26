import express from "express";
//import controllers
import { postAppointemnt, updateAppointment } from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();

// routes
router.route("/").post(makeExpressCallback(postAppointemnt));
router.route("/:id").patch(makeExpressCallback(updateAppointment));

export default router;
