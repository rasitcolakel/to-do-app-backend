const Joi = require("joi");
const schemas = {
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  register: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().required().valid(Joi.ref("password")),
  }),
  newTodo: Joi.object().keys({
    title: Joi.string().required(),
  }),
  updateTodo: Joi.object().keys({
    title: Joi.string().required(),
    status: Joi.number().required(),
  }),
};

module.exports = schemas;
