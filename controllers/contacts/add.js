const { ctrlWrapper } = require("../../helpers");
const {Contact} = require("../../models/contact");


const add = async (req, res, next) => {
  const {_id: owner} = req.user
  const add = await Contact.create({...req.body, owner})
  res.status(201).json(add)
};

module.exports = {
  add: ctrlWrapper(add)
}