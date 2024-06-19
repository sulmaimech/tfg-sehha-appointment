import mongoose from "mongoose";

const scheduleSlotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ScheduleSlot', scheduleSlotSchema);
