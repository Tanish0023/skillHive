let jobs = [
  {
    id: 1,
    category: "Tech",
    designation: "MERN Stack",
    location: "Delhi DL",
    companyName: "Coding Ninjas",
    salary: "15-20LPA",
    totalOpening: "5",
    skills: ["React", "NodeJS", "Angular", "Express"],
    applyBy: "10-01-2024",
    appliedBy: [45, 788],
    applicantsCount: 2,
    date: "1/22/2024",
    recruiterEmail: "johnwick@gmail.com",
  },
  {
    id: 2,
    category: "Tech",
    designation: "FrontEnd",
    location: "Banglore",
    companyName: "Microsoft",
    salary: "10-12LPA",
    totalOpening: "1",
    skills: ["React", "JS"],
    applyBy: "30-01-2024",
    appliedBy: [],
    applicantsCount: 4,
    date: "1/22/2024",
    recruiterEmail: "tanish23aggarwal@gmail.com",
  },
  {
    id: 3,
    category: "Non-Tech",
    designation: "Analytics",
    location: "Delhi DL",
    companyName: "Amazon",
    salary: "8-10LPA",
    totalOpening: "5",
    skills: ["Pyhton", "SQL"],
    applyBy: "15-01-2024",
    appliedBy: [],
    applicantsCount: 2,
    date: "1/22/2024",
    recruiterEmail: "tanish23aggarwal@gmail.com",
  },
];

export default class jobModel {
  static getById(id) {
    return jobs.find((p) => p.id == id);
  }

  static getJobs() {
    return jobs;
  }

  static checkRecruiter(id, email) {
    let havePermission = false;

    jobs.forEach((job) => {
      if (job.id == id && job.recruiterEmail == email) {
        havePermission = true;
      }
    });

    if (havePermission) {
      return true;
    } else {
      return false;
    }
  }

  static getSpecificJobs(companyName) {
    let jobsFound = [];

    jobs.forEach((job) => {
      if (job.companyName.toLowerCase() == companyName.toLowerCase()) {
        jobsFound.push(job);
      }
    });

    return jobsFound;
  }

  static newJobPost(body, email) {
    if (typeof body.skills === "string") {
      body.skills = Array(body.skills);
    }
    jobs.push({
      id: jobs.length + 1,
      category: body.category,
      designation: body.designation,
      location: body.location,
      companyName: body.companyName,
      salary: body.salary,
      totalOpening: body.totalOpening,
      skills: body.skills,
      applyBy: body.applyBy,
      appliedBy: [],
      applicantsCount: 0,
      date: new Date().toLocaleDateString(),
      recruiterEmail: email,
    });
  }

  static delete(id, email) {
    const index = jobs.findIndex(
      (p) => p.id == id && p.recruiterEmail == email
    );

    if (index >= 0) {
      jobs.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  static update(jobObj, id, email) {
    const index = jobs.findIndex(
      (p) => p.id == id && p.recruiterEmail == email
    );

    if (index >= 0) {
      jobs[index] = {
        id: id,
        category: jobObj.category,
        designation: jobObj.designation,
        location: jobObj.location,
        companyName: jobObj.companyName,
        salary: jobObj.salary,
        totalOpening: jobObj.totalOpening,
        skills: jobObj.skills,
        applyBy: jobObj.applyBy,
        appliedBy: [],
        applicantsCount: jobs[index]["appliedBy"],
        date: new Date().toLocaleDateString(),
        recruiterEmail: jobs[index]["recruiterEmail"],
      };
      return true;
    } else {
      return false;
    }
  }

  static updateApplicants(id) {
    jobs.forEach((job) => {
      if (job.id == id) {
        job.applicantsCount++;
      }
    });
  }
}
