const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRagexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  email: {
    type: String,
    match: emailRagexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: ""
  }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRagexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRagexp).required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valueOf("starter", "pro", "business").required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
}

// subscription: Joi.string().valid("starter", "pro", "business").required()