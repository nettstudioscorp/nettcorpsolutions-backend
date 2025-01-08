const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // ou outro serviço de email
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Senha de app do Gmail
  },
});

module.exports = transporter;
