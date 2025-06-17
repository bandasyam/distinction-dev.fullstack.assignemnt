const joi = require("joi");

/** body validators */
export const createProductSchema = joi.object({
  id: joi.string().required(),
  name: joi.string().required(),
  price: joi.number().required(),
  status: joi.string().valid("active", "inactive", "archived").required(),
  tags: joi.array().items(joi.string().required()).required(),
});

export const updateProductSchema = joi.object({
  name: joi.string(),
  price: joi.number(),
  status: joi.string().valid("active", "archived"),
  tags: joi.array().items(joi.string().required()),
});

/** query validators */
export const queryProductSchema = joi.object({
  page: joi.number().default(1),
});

/** params validators */
export const productParamsSchema = joi.object({
  id: joi.string().required(),
});
