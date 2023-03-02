const express = require('express');
const router = express.Router();

const { validateBody} = require("../../middlewares");
const { schemas } = require("../../models/user");

const {register} = require("../../controllers/auth")


router.post("/register", validateBody(schemas.registerSchema), register);

module.exports = router;