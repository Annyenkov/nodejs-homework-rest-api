const nodemailer = require('nodemailer');
require("dotenv").config();

const { META_KEY } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "annyenkov@meta.ua",
    pass: META_KEY,

  }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "annyenkov@meta.ua" };
  transport.sendMail(email)
    .then(() => console.log("Email success send"))
    .catch(error => console.log(error.message))
  return true;
};

module.exports = sendEmail;