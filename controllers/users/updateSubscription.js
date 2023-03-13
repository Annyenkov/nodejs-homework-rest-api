const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { userId } = req.params;

  const result = await User.findByIdAndUpdate(userId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, " Not found ");
  }
  const { subscription, email } = result;
  res.json({
    updateSubscription: subscription,
    email: email,
  });
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription)
};