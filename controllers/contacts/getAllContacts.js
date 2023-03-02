const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const allContacts = await Contact.find();
  res.json(allContacts)
};

module.exports = {
  getAll: ctrlWrapper(getAll),
}