const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const removeById = await Contact.findByIdAndRemove(contactId);
  res.json(removeById)
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
}