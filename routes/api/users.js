const express = require('express');
const router = express.Router();

const { validateBody, authenticate} = require("../../middlewares");
const { schemas } = require("../../models/user");

const { register, login, current, logout, updateSubscription} = require("../../controllers/users")


router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/logout", authenticate, logout)
router.get("/current", authenticate, current);
router.patch("/:userId/subscription", validateBody(schemas.subscriptionSchema), updateSubscription);


module.exports = router;