const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const update = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  res.json(update);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
}