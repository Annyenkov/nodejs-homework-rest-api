const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click verify email</a>`
  };
  await sendEmail(verifyEmail);
  res.json({
    message: "Verification email sent"
  })
}

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}