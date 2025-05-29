






import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date },
  allDay: { type: Boolean, default: false },
  description: { type: String }, // ✅ Added field to store admin notes
});



export default mongoose.model('events', eventSchema);