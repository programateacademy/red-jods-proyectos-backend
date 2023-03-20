const nodemailer = require("nodemailer");

const transporter = () => {
  const user = process.env.USER;
  const pass = process.env.PASS;
  console.log(user)
  console.log(pass)
  nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: pass, 
    }
  });
};

module.exports = {
  transporter,
};
