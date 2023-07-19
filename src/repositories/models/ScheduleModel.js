import mongoose from "mongoose";
import Appointment from "./AppointmentModel.js";
import Professional from "./ProfessionalModel.js";

// Define the schedule schema
const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Appointment,
    },
  ],
  professional: { type: mongoose.Schema.Types.ObjectId, ref: Professional },
});

export default mongoose.model("Schedule", scheduleSchema);
