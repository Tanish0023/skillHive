let applicants = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun45@gmail.com",
    resume: "arunresume.pdf",
    phoneNumber: 9752213545,
    jobsAppplied: [1, 2],
  },
  {
    id: 2,
    name: "Arya vats",
    email: "arya77@gmail.com",
    resume: "aryaresume.pdf",
    phoneNumber: 9845445468,
    jobsAppplied: [2, 3],
  },
  {
    id: 3,
    name: "John Wick",
    email: "johnwick@gmail.com",
    resume: "johnresume.pdf",
    phoneNumber: 8442606546,
    jobsAppplied: [2],
  },
  {
    id: 4,
    name: "Nipun Sharma",
    email: "NipunSh@gmail.com",
    resume: "nipunresume.pdf",
    phoneNumber: 7564456123,
    jobsAppplied: [1, 2, 3],
  },
];

export default class applicantModel {
  static applicantListDisplay(id) {
    let appliedApplicant = [];

    applicants.forEach((applicant) => {
      applicant.jobsAppplied.forEach((a) => {
        if (a == id) {
          appliedApplicant.push(applicant);
        }
      });
    });

    return appliedApplicant;
  }

  static addApplicant(applicantObj, jobID, resume) {
    let applicantAdded = false;

    applicants.forEach((applicant) => {
      if (applicant.email == applicantObj.email) {
        applicant.jobsAppplied.push(jobID);
        applicantAdded = true;
      }
    });

    if (!applicantAdded) {
      applicants.push({
        id: applicants.length + 1,
        name: applicantObj.name,
        email: applicantObj.email,
        resume: resume,
        phoneNumber: applicantObj.phoneNumber,
        jobsAppplied: [jobID],
      });
    }
  }
}
