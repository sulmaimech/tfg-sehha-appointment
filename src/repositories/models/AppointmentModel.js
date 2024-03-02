import mongoose  from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  specialist: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' },
  speciality: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' },
  status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
  appointmentDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', appointmentSchema);
