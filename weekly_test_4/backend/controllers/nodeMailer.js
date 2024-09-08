import nodemailer from "nodemailer";

export default function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const msg = `Hello ${data.name}. Thank you for registering.\n Your email is ${data.email}.\n Your gender is ${data.gender}.`;

  const mailOptions = {
    from: process.env.USER,
    to: data.email,
    subject: "Node.js Email Tutorial",
    text: msg,
    // html: `<h1>${msg}</h1>`, //this can also be used
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
