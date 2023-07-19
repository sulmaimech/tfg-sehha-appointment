import express from "express";
//import controllers
import { postAppointemnt } from "../controllers/index.js";
import makeExpressCallback from "../utils/makeExpressCallback.js";

// create router
const router = express.Router();

// routes
router.route("/").post(makeExpressCallback(postAppointemnt));

export default router;
