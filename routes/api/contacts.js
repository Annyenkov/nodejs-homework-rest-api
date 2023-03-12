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

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {schemas} = require("../../models/contact");

router.get('/', authenticate, getAll);
router.get('/:contactId', isValidId, authenticate, getById);
router.post('/', validateBody(schemas.addSchemas), authenticate, add);
router.delete('/:contactId', isValidId, authenticate, deleteById);
router.put('/:contactId', isValidId, validateBody(schemas.addSchemas), authenticate, updateById);
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), authenticate, updateFavorite);

module.exports = router;
