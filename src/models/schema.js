import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  category: { type: String, required: true },
  designation: { type: String, required: true },
  location: { type: String, required: true },
  companyName: { type: String, required: true },
  salary: { type: String, required: true },
  totalOpening: { type: Number, required: true },
  skills: [{ type: String }],
  applyBy: { type: Date, required: true },
  appliedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Applicant" }],
  applicantsCount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  recruiterEmail: { type: String, required: true },
});

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  jobsAppplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

const recruiterSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Job = mongoose.model("Job", jobSchema);
const Applicant = mongoose.model("Applicant", applicantSchema);
const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export { Job, Applicant, Recruiter };
