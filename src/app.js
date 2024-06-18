import express from "express";
import router from "./routers/appointmentRoutes.js";
import {startConsumers} from './frameworks/rabbitmq/consumers.js'



const app = express();
app.use(express.json());

app.use("/api/v1/appointment-management", router);

startConsumers();

export default app;
