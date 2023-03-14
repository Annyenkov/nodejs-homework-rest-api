const bcrypt = require("bcrypt");
const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const gravatar = require('gravatar');


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use")
  };
  const createHashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    avatarURL: avatarUrl,
    password: createHashPassword,
  });
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