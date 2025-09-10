import { Recruiter } from "./schema.js";

export default class recruiterModel {
  static async addRecruiterModel(recruiter) {
    try {
      const newRecruiter = new Recruiter({
        firstname: recruiter.firstName,
        lastName: recruiter.lastName,
        email: recruiter.email,
        password: recruiter.password,
      });

      await newRecruiter.save();
      return newRecruiter;
    } catch (err) {
      console.error("Error in addRecruiterModel:", err);
      return null;
    }
  }

  static async checkRecruiterDetails(email, password) {
    try {
      const result = await Recruiter.findOne({ email, password });
      return result;
    } catch (err) {
      console.error("Error in checkRecruiterDetails:", err);
      return null;
    }
  }

  static async recruiterAlreadyExist(email) {
    try {
      const recruiter = await Recruiter.findOne({ email });
      return recruiter;
    } catch (err) {
      console.error("Error in recruiterAlreadyExist:", err);
      return null;
    }
  }
}
