const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
require("dotenv/config");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail(userEmail, token) {
  const options = {
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  };

  const transport = nodemailer.createTransport(sgTransport(options));

  const msg = {
    to: userEmail,
    from: process.env.FROM_EMAIL,
    subject: "Password Reset",
    html: `<h1>Rest your password</h1>
    <p>Please click on the link below to reset your password</p>
    <a href="http://localhost:${process.env.PORT}/update-account-info/${token}">Click me!</a>`,
  };

  transport.sendMail(msg, function (err, successMsg) {
    if (err) console.log(err);
    else {
      console.log(successMsg);
    }
  });
}

module.exports = sendMail;
