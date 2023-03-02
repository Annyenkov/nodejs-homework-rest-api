const { ctrlWrapper } = require("../../helpers");
const {Contact} = require("../../models/contact");


const add = async (req, res, next) => {
  const add = await Contact.create(req.body)
  res.status(201).json(add)
};

module.exports = {
  add: ctrlWrapper(add)
}