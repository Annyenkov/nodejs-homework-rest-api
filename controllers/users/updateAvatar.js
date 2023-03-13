const { ctrlWrapper } = require("../../helpers");
const fs = require('fs/promises');
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const userDir = path.resolve('./public/avatars/')

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).writeAsync(tempUpload);

  const resultUpload = path.join(userDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", originalname);

  await User.findByIdAndUpdate(_id, { avatarURL: avatarURL });
  
  res.json({
    avatarURL: avatarURL,
  });
}

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
}