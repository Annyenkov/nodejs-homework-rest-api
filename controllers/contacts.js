const { ctrlWrapper } = require("../helpers");
const {Contact} = require("../models/contact");

const getAll = async (req, res, next) => {
  const allContacts = await Contact.find();
  res.json(allContacts)
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await Contact.findById(contactId);
  res.json(getContact)
};

const add = async (req, res, next) => {
  const add = await Contact.create(req.body)
  res.status(201).json(add)
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const removeById = await Contact.findByIdAndRemove(contactId);
  res.json(removeById)
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const update = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  res.json(update);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const update = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  res.json(update);
};


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
}
