import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  company: {
    type: String,
    required: [true, "Company Name is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
});

const job = mongoose.model("job", jobSchema);
export default job;
