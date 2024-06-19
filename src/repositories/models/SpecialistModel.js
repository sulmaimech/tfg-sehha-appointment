import mongoose from "mongoose";

const specialistSchema = new mongoose.Schema({
  _id: { type:  mongoose.Schema.Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  specialities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' }],
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });
export default mongoose.model('Specialist', specialistSchema);
