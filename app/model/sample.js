import mongoose from 'mongoose';
const Schema = mongoose.Schema;
 
const SampleSchema   = new Schema({
  title:   { type: String, required: true, unique: true },
  created: { type: Date,   required: true, default: Date.now }
});
 
export default mongoose.model('Sample', SampleSchema);
