import mongoose from "mongoose";
import Patient from "./PatientModel.js";
import Professional from "./ProfessionalModel.js";

const appointmentSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  date: { type: String },
  duration: { type: Number, required: true },
  visitType: { type: String, required: true },
  visitReason: { type: String, required: true },
  status: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: Patient },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: Professional },
  videoAppointment: { type: String },
});

export default mongoose.model("Appointment", appointmentSchema);
