let recruiters = [
  {
    firstname: "John",
    lastName: "Wick",
    email: "johnwick@gmail.com",
    password: "123",
  },
  {
    firstname: "Tanish",
    lastName: "Aggarwal",
    email: "tanish23aggarwal@gmail.com",
    password: "987",
  },
];

export default class recruiterModel {
  static addRecruiterModel(recruiter) {
    recruiters.push({
      firstname: recruiter.firstName,
      lastName: recruiter.lastName,
      email: recruiter.email,
      password: recruiter.password,
    });
  }

  static checkRecruiterDetails(email, password) {
    const result = recruiters.find(
      (recruiter) => recruiter.email == email && recruiter.password == password
    );
    return result;
  }

  recruiterAlreadyExist(email) {
    return recruiters.find((u) => u.email == email);
  }
}
