import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  branch: { type: String, required: true },
});

export default mongoose.model("Student", studentSchema);
