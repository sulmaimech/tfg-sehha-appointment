import express from "express";
import router from "./routers/appointmentRoutes.js";

const app = express();
app.use(express.json());

//
app.use("/api/v1/appointments", router);
console.log(router.stack.map(r => r.route.path))

export default app;
