import mongoose from "mongoose";
// firstName,
// firstLastName,
// secondLastName,
// specialization,
// email,
// password,
// phone,
const professionalSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  firstLastName: { type: String, required: true },
  secondLastName: { type: String },
  specialization: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model("Professional", professionalSchema);
