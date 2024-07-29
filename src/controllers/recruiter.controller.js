<<<<<<< HEAD
import recruiterModel from "../models/recruiter.model.js";
import jobModel from "../models/jobs.model.js";

export default class recruiterController {
  addRecruiter(req, res) {
    recruiterModel.addRecruiterModel(req.body);

    res.render("recruiter-login", { errorMessage: null });
  }

  loginRecruiter(req, res) {
    if (
      recruiterModel.checkRecruiterDetails(req.body.email, req.body.password)
    ) {
      req.session.userEmail = req.body.email;

      return res.render("job-listing", {
        jobs: jobModel.getJobs(),
        userEmail: req.session.userEmail,
      });
    } else {
      return res.render("recruiter-login", {
        errorMessage: "Invalid Credentials",
      });
    }
  }

  async postNewJob(req, res) {
    jobModel.newJobPost(req.body, req.session.userEmail);
    res.redirect("/job-listing");
    // res.status(202).send("Job added successfully");
  }

  newJobDisplay(req, res) {
    res.render("new-job", { userEmail: req.session.userEmail });
  }

  deleteJob(req, res) {
    const id = req.params.id;
    const productFound = jobModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Job not found");
    }
    if (jobModel.delete(id, req.session.userEmail)) {
      return res.render("job-listing", {
        jobs: jobModel.getJobs(),
        userEmail: req.session.userEmail,
      });
    } else {
      return res.status(401).send("You are not allowed to Delete this Job");
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/recruiter-login");
      }
    });
    res.clearCookie("lastVisit");
  }

  getUpdateJobView(req, res) {
    const id = req.params.id;
    const jobFound = jobModel.getById(id);
    if (jobFound) {
      res.render("update-job", {
        job: jobFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).send("Job not found");
    }
  }

  postUpdateJob(req, res) {
    if (jobModel.update(req.body, req.params.id, req.session.userEmail)) {
      var jobs = jobModel.getJobs();
      res.render("job-listing", { jobs });
    } else {
      return res.status(401).send("You are not allowed to Update this Job");
    }
  }
}
=======
import recruiterModel from "../models/recruiter.model.js";
import jobModel from "../models/jobs.model.js";

export default class recruiterController {
  addRecruiter(req, res) {
    recruiterModel.addRecruiterModel(req.body);

    res.render("recruiter-login", { errorMessage: null });
  }

  loginRecruiter(req, res) {
    if (
      recruiterModel.checkRecruiterDetails(req.body.email, req.body.password)
    ) {
      req.session.userEmail = req.body.email;

      return res.render("job-listing", {
        jobs: jobModel.getJobs(),
        userEmail: req.session.userEmail,
      });
    } else {
      return res.render("recruiter-login", {
        errorMessage: "Invalid Credentials",
      });
    }
  }

  async postNewJob(req, res) {
    jobModel.newJobPost(req.body, req.session.userEmail);
    res.redirect("/job-listing");
    // res.status(202).send("Job added successfully");
  }

  newJobDisplay(req, res) {
    res.render("new-job", { userEmail: req.session.userEmail });
  }

  deleteJob(req, res) {
    const id = req.params.id;
    const productFound = jobModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Job not found");
    }
    if (jobModel.delete(id, req.session.userEmail)) {
      return res.render("job-listing", {
        jobs: jobModel.getJobs(),
        userEmail: req.session.userEmail,
      });
    } else {
      return res.status(401).send("You are not allowed to Delete this Job");
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/recruiter-login");
      }
    });
    res.clearCookie("lastVisit");
  }

  getUpdateJobView(req, res) {
    const id = req.params.id;
    const jobFound = jobModel.getById(id);
    if (jobFound) {
      res.render("update-job", {
        job: jobFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).send("Job not found");
    }
  }

  postUpdateJob(req, res) {
    if (jobModel.update(req.body, req.params.id, req.session.userEmail)) {
      var jobs = jobModel.getJobs();
      res.render("job-listing", { jobs });
    } else {
      return res.status(401).send("You are not allowed to Update this Job");
    }
  }
}
>>>>>>> 686fe4a23f50117e4ea0a2b8204a3d483a309083
