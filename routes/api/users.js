const express = require('express');
const router = express.Router();

const { validateBody, authenticate, upload} = require("../../middlewares");
const { schemas } = require("../../models/user");

const { register, login, current, logout, updateSubscription, updateAvatar, verifyEmail, resendVerifyEmail} = require("../../controllers/users")


router.post("/register", validateBody(schemas.registerSchema), register);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateBody(schemas.emailSchema), resendVerifyEmail)
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/logout", authenticate, logout)
router.get("/current", authenticate, current);
router.patch("/:userId/subscription", validateBody(schemas.subscriptionSchema), updateSubscription);
router.patch("/avatars", authenticate, upload.single("avatarURL"), updateAvatar);


module.exports = router;