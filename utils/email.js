const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // *1) Create a transporter
  // service: 'Gmail', //In case of Gmail
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // *2) Define the email options
  const mailOptions = {
    from: "Swetank Raj <myemailid@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: //for converting it to html
  };

  // *3) Sending the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
