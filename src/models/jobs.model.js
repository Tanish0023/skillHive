import { Job } from "./schema.js";

export default class jobModel {
  static async getById(id) {
    try {
      const job = await Job.findById(id);
      return job;
    } catch (err) {
      console.error("Error in getById:", err);
      return null;
    }
  }

  static async getJobs() {
    try {
      return await Job.find();
    } catch (err) {
      console.error("Error in getJobs:", err);
      return [];
    }
  }

  static async checkRecruiter(id, email) {
    try {
      const job = await Job.findOne({ _id: id, recruiterEmail: email });
      return !!job;
    } catch (err) {
      console.error("Error in checkRecruiter:", err);
      return false;
    }
  }

  static async getSpecificJobs(companyName) {
    try {
      return await Job.find({
        companyName: { $regex: new RegExp("^" + companyName + "$", "i") },
      });
    } catch (err) {
      console.error("Error in getSpecificJobs:", err);
      return [];
    }
  }

  static async newJobPost(body, email) {
    try {
      if (typeof body.skills === "string") {
        body.skills = [body.skills];
      }

      const job = new Job({
        category: body.category,
        designation: body.designation,
        location: body.location,
        companyName: body.companyName,
        salary: body.salary,
        totalOpening: body.totalOpening,
        skills: body.skills,
        applyBy: new Date(body.applyBy),
        appliedBy: [],
        applicantsCount: 0,
        recruiterEmail: email,
      });

      await job.save();
      return job;
    } catch (err) {
      console.error("Error in newJobPost:", err);
      return null;
    }
  }

  static async delete(id, email) {
    try {
      const result = await Job.findOneAndDelete({ _id: id, recruiterEmail: email });
      return !!result;
    } catch (err) {
      console.error("Error in delete:", err);
      return false;
    }
  }

  static async update(jobObj, id, email) {
    try {
      const updatedJob = await Job.findOneAndUpdate(
        { _id: id, recruiterEmail: email },
        {
          category: jobObj.category,
          designation: jobObj.designation,
          location: jobObj.location,
          companyName: jobObj.companyName,
          salary: jobObj.salary,
          totalOpening: jobObj.totalOpening,
          skills: jobObj.skills,
          applyBy: new Date(jobObj.applyBy),
          date: new Date(),
        },
        { new: true }
      );

      return !!updatedJob;
    } catch (err) {
      console.error("Error in update:", err);
      return false;
    }
  }

  static async updateApplicants(id) {
    try {
      await Job.findByIdAndUpdate(id, { $inc: { applicantsCount: 1 } });
    } catch (err) {
      console.error("Error in updateApplicants:", err);
    }
  }
}
