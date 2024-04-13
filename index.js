import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import recruiterController from "./src/controllers/recruiter.controller.js";
import userController from "./src/controllers/user.controller.js";
import validateRequest from "./src/middlewares/RecruiterValidation.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";

let recruiterControllerCall = new recruiterController();
let userControllerCall = new userController();

const app = express();

app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cookieParser());
app.use(setLastVisit);

app.use(express.static(path.join("src", "views")));
app.use(express.static(path.join("src", "views", "css")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.get("/", userController.renderPage);

app.get("/recruiter-login", (req, res) => {
  res.render("recruiter-login", { errorMessage: null });
});

app.post("/recruiter-login", recruiterControllerCall.loginRecruiter);

//
app.get("/recruiter-registration", (req, res) => {
  res.render("recruiter-registration", { errorMessage: null });
});

app.post(
  "/recruiter-registration",
  validateRequest,
  recruiterControllerCall.addRecruiter
);

app.post("/job-display-specific", userController.specificJobDisplay);

app.get("/job-listing", userController.jobDisplay);

app.get("/job-listing/:id", userController.jobIdDisplay);

app.get("/new-job", setLastVisit, auth, recruiterControllerCall.newJobDisplay);

app.post("/new-job", setLastVisit, auth, recruiterControllerCall.postNewJob);
app.get("/logout", recruiterControllerCall.logout);

app.get("/update-job/:id", auth, recruiterControllerCall.getUpdateJobView);
app.post("/update-job/:id", auth, recruiterControllerCall.postUpdateJob);

app.get(
  "/delete-job/:id",
  setLastVisit,
  auth,
  recruiterControllerCall.deleteJob
);

app.post(
  "/applicantApply/:id",
  uploadFile.single("resume"),
  userControllerCall.apply
);

app.get(
  "/applicant-Display/:id",
  auth,
  userControllerCall.renderApplicantDisplay
);

app.listen(3000, () => {
  console.log("App is listening at 3000");
});
