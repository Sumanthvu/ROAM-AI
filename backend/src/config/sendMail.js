 import nodemailer from "nodemailer";
  
  const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASS,
    },
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