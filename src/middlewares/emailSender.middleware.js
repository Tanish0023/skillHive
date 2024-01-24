import { createTransport } from "nodemailer";

export const emailSender = async (obj) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "emailsender604@gmail.com",
      pass: "ggbj qrmz fhkz ttal",
    },
  });

  // COnfigure Email content
  const mainOption = {
    from: "emailsender604@gmail.com",
    to: obj.email,
    subject: "SkillHive: Thanks for applying",
    text: `Hello ${obj.name},\n\nYour details have been forwarded, Thanks for using our service.\n\nRegards,\nSkillHive`,
  };

  // Sending Email
  try {
    const result = await transporter.sendMail(mainOption);
    console.log("Mail send successfully");
  } catch (err) {
    console.log("Email send failed with error:  " + err);
  }
};
