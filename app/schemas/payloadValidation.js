const Joi = require("joi");
const schema = Joi.object({
  drawDate: Joi.string().required(),
  picks: Joi.array().min(1).required(),
});

module.exports = schema;
