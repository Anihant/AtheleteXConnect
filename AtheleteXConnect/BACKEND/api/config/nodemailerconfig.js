const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: "parshipraneesh8@gmail.com",
    pass: process.env.NODEMAILER_PASS,
  },
});

module.exports = {transporter};