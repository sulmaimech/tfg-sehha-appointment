import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date},
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  gender: {type: String},
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

export default mongoose.model('User', userSchema);
