const { ctrlWrapper } = require("../../helpers");
const {Contact} = require("../../models/contact");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await Contact.findById(contactId);
  res.json(getContact)
};

module.exports = {
  getById: ctrlWrapper(getById),
}