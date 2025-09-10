import { Applicant } from "./schema.js";
import { Job } from "./schema.js";

export default class applicantModel {
  static async applicantListDisplay(id) {
    try {
      const applicants = await Applicant.find({ jobsAppplied: id });
      return applicants;
    } catch (err) {
      console.error("Error in applicantListDisplay:", err);
      return [];
    }
  }

  static async addApplicant(applicantObj, jobID, resume) {
    try {
      let applicant = await Applicant.findOne({ email: applicantObj.email });

      if (applicant) {
        if (!applicant.jobsAppplied.includes(jobID)) {
          applicant.jobsAppplied.push(jobID);
          await applicant.save();
        }
      } else {
        applicant = new Applicant({
          name: applicantObj.name,
          email: applicantObj.email,
          resume: resume,
          phoneNumber: applicantObj.phoneNumber,
          jobsAppplied: [jobID],
        });
        await applicant.save();
      }

      await Job.findByIdAndUpdate(jobID, { $inc: { applicantsCount: 1 } });

      return applicant;
    } catch (err) {
      console.error("Error in addApplicant:", err);
      return null;
    }
  }
}
