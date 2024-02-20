import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  specialist: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialist', required: true },
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleSlot' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Schedule', scheduleSchema);
