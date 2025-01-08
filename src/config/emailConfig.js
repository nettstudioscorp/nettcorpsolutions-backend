const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true para porta 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Senha de App do Google
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verificar conexão
transporter.verify(function (error, success) {
  if (error) {
    console.log("Erro na configuração do email:", error);
  } else {
    console.log("Servidor de email pronto para enviar mensagens");
  }
});

module.exports = transporter;
