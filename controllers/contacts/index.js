const { add } = require("./add");
const { deleteById } = require("./deleteById");
const { getAll } = require("./getAllContacts");
const {getById} = require("./getById")
const { updateById } = require("./updateById");
const { updateFavorite } = require("./updateFavorite");




module.exports = {
  add,
  deleteById,
  getAll,
  updateById,
  updateFavorite,
  getById,
}
