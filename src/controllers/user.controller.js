import jobModel from "../models/jobs.model.js";
import applicantModel from "../models/applicant.model.js";
import { emailSender } from "../middlewares/emailSender.middleware.js";

// const applicantModelCall = new applicantModel();

export default class userController {
  static jobDisplay(req, res) {
    res.render("job-listing", {
      jobs: jobModel.getJobs(),
      userEmail: req.session.userEmail,
    });
  }

  static specificJobDisplay(req, res) {
    res.render("job-listing", {
      jobs: jobModel.getSpecificJobs(req.body.specificJob),
      userEmail: req.session.userEmail,
    });
  }

  static jobIdDisplay(req, res) {
    const id = req.params.id;
    const jobFound = jobModel.getById(id);
    if (jobFound) {
      res.render("job-Display", {
        job: jobFound,
        userEmail: req.session.userEmail,

        errorMessage: null,
      });
    } else {
      res.status(401).send("Job not found");
    }
  }

  static renderPage(req, res) {
    res.render("landingPage", { userEmail: req.session.userEmail });
  }

  renderApplicantDisplay(req, res) {
    const id = req.params.id;
    const email = req.session.userEmail;

    if (jobModel.checkRecruiter(id, email)) {
      const applicants = applicantModel.applicantListDisplay(id);

      res.render("applicant-Display", {
        applicants,
      });
    } else {
      res.status(404).send("You are not allowed!!");
    }
  }

  apply(req, res) {
    const id = req.params.id;

    emailSender(req.body);

    jobModel.updateApplicants(id);
    applicantModel.addApplicant(req.body, id, req.session.resume);

    res.redirect("/job-listing");
  }
}
