const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require("joi")

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
      type: Boolean,
      default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const addSchemas = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  phone: Joi.string().min(9).max(14).required(),
  favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchemas,
  updateFavoriteSchema,
}
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};