import { Job } from "../models/schema.js";
import { Applicant } from "../models/schema.js";
import { emailSender } from "../middlewares/emailSender.middleware.js";

export default class userController {
  static async jobDisplay(req, res) {
    const jobs = await Job.find();
    res.render("job-listing", { jobs, userEmail: req.session.userEmail });
  }

  static async specificJobDisplay(req, res) {
    const jobs = await Job.find({ companyName: req.body.specificJob });
    res.render("job-listing", { jobs, userEmail: req.session.userEmail });
  }

  static async jobIdDisplay(req, res) {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.render("job-Display", { job, userEmail: req.session.userEmail, errorMessage: null });
    } else {
      res.status(404).send("Job not found");
    }
  }

  static renderPage(req, res) {
    res.render("landingPage", { userEmail: req.session.userEmail });
  }

  async renderApplicantDisplay(req, res) {
    const { id } = req.params;
    const email = req.session.userEmail;

    const job = await Job.findOne({ _id: id, recruiterEmail: email });
    if (!job) return res.status(403).send("You are not allowed!!");

    const applicants = await Applicant.find({ jobsApplied: id });
    res.render("applicant-Display", { applicants });
  }

  async apply(req, res) {
    const id = req.params.id;
    emailSender(req.body);

    await Job.findByIdAndUpdate(id, { $inc: { applicantsCount: 1 } });

    await Applicant.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          resume: req.file?.filename || "",
        },
        $addToSet: { jobsApplied: id },
      },
      { upsert: true }
    );

    res.redirect("/job-listing");
  }
}
