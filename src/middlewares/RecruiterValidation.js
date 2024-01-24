import recruiterModel from "../models/recruiter.model.js";

import { body, validationResult } from "express-validator";

const recruiterModela = new recruiterModel();

const validateRequest = async (req, res, next) => {
  // 1. Setup rules for validation.
  const rules = [
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("email")
      .trim()
      .isEmail()
      .custom(async (value) => {
        const user = recruiterModela.recruiterAlreadyExist(value);
        if (user) {
          throw new Error("E-mail already in use");
        }
      }),

    body("password")
      .exists()
      .isStrongPassword({
        minLength: 4,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 0,
        pointsForContainingUpper: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0,
      })
      .withMessage(
        "Password must have at least 4 characters with min of 1 numbers"
      ),
  ];

  // 2. run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("recruiter-registration", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};

export default validateRequest;
