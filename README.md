# SkillHive

 A Website for job seekers and recruiters, they can find and apply to the jobs that align with their skills and interests.


## Its Features:

For Recruiters:
1. Effortless job posting: Say goodbye to clunky interfaces.
2. Candidate insights at your fingertips: Dive into detailed profiles and resumes.
3. Streamlined communication: Manage applications and engage with talent with ease.

For Job Seekers:
1. Uncover a wealth of possibilities: Explore jobs by industry, location, and more.
2. Dive into informative descriptions: Know exactly what you're applying for.
3. Apply with confidence: One click is all it takes to make your move.


SkillHive is more than just a job portal. It's a platform built for connection, efficiency, and user-friendliness.

# System Architecture

![image](https://github.com/user-attachments/assets/3436847c-535a-4c27-a2ee-9d685386bbf0)


The proposed job portal adopts a Model-View-Controller (MVC) architecture to effectively separate concerns and enhance maintainability. Node.js serves as the backend framework, handling server-side logic and data management. Express.js provides a robust routing and middleware layer. EJS is employed for templating, generating dynamic HTML views.
Data Modeling (In-Memory)
Given the project's constraint of using in-memory storage, data structures are employed to represent users, job postings, and applications. These structures are stored in memory during the application's lifecycle.
- User: Contains user ID, name, email, password, and other relevant details.
- Job Posting: Includes job ID, title, description, company, location, salary, and other job-related information.
- Application: Stores application ID, user ID, job ID, application date, and resume details.

### User Interface
The user interface is designed with a focus on simplicity and usability. Bootstrap is utilized for creating responsive and visually appealing components. Key interface elements include:
- User Dashboard: Provides a personalized view of job applications, saved searches, and alerts.
- Job Search: Offers advanced search filters based on keywords, location, job type, and salary range.
- Job Details: Displays detailed job descriptions, company information, and application options.
- Employer Dashboard: Allows employers to post jobs, manage applications, and view job performance metrics.

### Core Functionalities
- User Registration and Login: Implements user authentication using sessions and cookies.
- Job Posting: Enables employers to create, edit, and delete job postings.
- Job Search: Provides robust search capabilities with filtering options.
- Application Process: Facilitates job applications, resume uploads, and application tracking.
- Data Validation: Utilizes Express-validator to ensure data integrity and prevent malicious input.

### File Handling
Multer is employed to handle file uploads, specifically for resumes. Uploaded resumes are stored temporarily in memory for processing and can be integrated with a cloud storage solution for long-term storage in future enhancements.
Security Considerations
While this project focuses on core functionalities, security is a paramount concern. Essential security measures include:
- Password Hashing: Strong password hashing algorithms should be used to protect user credentials.
- Input Validation: Rigorous input validation is essential to prevent vulnerabilities like SQL injection and cross-site scripting (XSS).
- Session Management: Proper session management practices should be followed to prevent session hijacking.
- Data Privacy: User data should be treated with confidentiality, and appropriate measures should be taken to protect sensitive information.



## Project Screenshots

### Home Page
![1712344339872](https://github.com/user-attachments/assets/842c0665-cf6c-423f-bf9a-b5a002a55c05)

### Job Listing Section
![1712344339872](https://github.com/user-attachments/assets/554ab387-65e0-4e1b-8dad-d55bea324080)

### Job Detail Section
![1712344339872](https://github.com/user-attachments/assets/081e735a-31cb-4c18-acd0-1b4c28c16066)

### Applicant applying For the job
![1712344339872](https://github.com/user-attachments/assets/f395acb6-c1fc-4c1f-9515-79c4419a6457)

### Recruiter Registration
![1712344339872](https://github.com/user-attachments/assets/7a9d205b-0b7c-42fd-9cc2-1280a9e7b3df)

### Applied applicants Section(Visible to Recruiter)
![1706261812688](https://github.com/user-attachments/assets/71475269-b36b-49c5-801f-8f37767e69b2)

