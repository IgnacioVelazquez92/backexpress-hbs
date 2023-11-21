const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Servidor SMTP de Microsoft 365
  port: 587, // Puerto SMTP de Microsoft 365
  secure: false, // Si es true, utiliza SSL/TLS
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
    pass: process.env.EMAIL_PASS, // Tu contraseña
  },
});

module.exports = { transporter };
