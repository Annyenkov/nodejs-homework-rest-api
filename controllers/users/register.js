const bcrypt = require("bcrypt");
const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");
const gravatar = require('gravatar');
const {uid} = require('uid')
require("dotenv").config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use")
  };
  const createHashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uid();
  const avatarUrl = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    avatarURL: avatarUrl,
    password: createHashPassword,
    verificationToken: verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click verify email</a>`
  };
  await sendEmail(verifyEmail);
  res.json({
    user: {
      email: newUser.email,
      subscription: "starter"
    }
  });
};

module.exports = {
  register: ctrlWrapper(register),
}