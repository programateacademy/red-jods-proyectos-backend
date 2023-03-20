const nodemailer = require("nodemailer");
const userEmail = process.env.USER;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: userEmail,
    pass: pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  transporter
};
