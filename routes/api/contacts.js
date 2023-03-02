const express = require('express');
const router = express.Router();

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const {schemas} = require("../../models/contact");

router.get('/', getAll);
router.get('/:contactId', isValidId, getById);
router.post('/', validateBody(schemas.addSchemas), add);
router.delete('/:contactId', isValidId, deleteById);
router.put('/:contactId', isValidId, validateBody(schemas.addSchemas), updateById);
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

module.exports = router;
