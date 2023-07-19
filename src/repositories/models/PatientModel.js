import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  firstName: { type: String },
  firstLastName: { type: String },
  secondLastName: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
});

export default mongoose.model("Patient", patientSchema);
