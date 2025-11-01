 import nodemailer from "nodemailer";
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  });
  
  export const sendEmail = (to, sub, msg) => {
    transporter.sendMail(
      {
        from: "sumanthveslavath07@gmail.com", 
        to: to,
        subject: sub,
        html: msg,
      },
      (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent:", info.response);
        }
      }
    );
  };