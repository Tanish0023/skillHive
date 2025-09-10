import { Recruiter } from "../models/schema.js";
import { Job } from "../models/schema.js";

export default class recruiterController {
  async addRecruiter(req, res) {
    try {
      await Recruiter.create(req.body);
      res.render("recruiter-login", { errorMessage: null });
    } catch (err) {
      console.error(err);
      res.render("recruiter-registration", {
        errorMessage: "Could not register recruiter",
      });
    }
  }

  async loginRecruiter(req, res) {
    try {
      const recruiter = await Recruiter.findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (recruiter) {
        req.session.userEmail = recruiter.email;
        const jobs = await Job.find();
        return res.render("job-listing", { jobs, userEmail: recruiter.email });
      } else {
        return res.render("recruiter-login", {
          errorMessage: "Invalid Credentials",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async postNewJob(req, res) {
    try {
      await Job.create({ ...req.body, recruiterEmail: req.session.userEmail });
      res.redirect("/job-listing");
    } catch (err) {
      console.error(err);
      res.status(500).send("Could not add job");
    }
  }

  newJobDisplay(req, res) {
    res.render("new-job", { userEmail: req.session.userEmail });
  }

  async deleteJob(req, res) {
    try {
      const result = await Job.findOneAndDelete({
        _id: req.params.id,
        recruiterEmail: req.session.userEmail,
      });

      if (!result) {
        return res.status(401).send("You are not allowed to Delete this Job");
      }

      const jobs = await Job.find();
      return res.render("job-listing", {
        jobs,
        userEmail: req.session.userEmail,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      res.clearCookie("lastVisit");
      res.redirect("/recruiter-login");
    });
  }

  async getUpdateJobView(req, res) {
    try {
      const job = await Job.findOne({
        _id: req.params.id,
        recruiterEmail: req.session.userEmail,
      });

      if (!job) return res.status(404).send("Job not found");

      res.render("update-job", {
        job,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async postUpdateJob(req, res) {
    try {
      const job = await Job.findOneAndUpdate(
        { _id: req.params.id, recruiterEmail: req.session.userEmail },
        req.body,
        { new: true }
      );

      if (!job) {
        return res.status(401).send("You are not allowed to Update this Job");
      }

      const jobs = await Job.find();
      res.render("job-listing", { jobs, userEmail: req.session.userEmail });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
}
