const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  name: {
    type: String,
    reqired: [true, 'Name is required'],
  },
  email: {
    type: String,
    match: emailRegex,
    unique: true,
    reqired: [true, 'Email is required'],
  },
  password: {
    type: String,
    minlength: 6,
    reqired: [true, 'Set password for user']

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

}, { versionKey: false, timestamps: true })

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter')
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required()
})

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter').required()
})

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas
}