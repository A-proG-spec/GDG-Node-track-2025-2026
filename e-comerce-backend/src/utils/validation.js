import Joi from "joi";

export const productValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
});

export const cartItemValidation = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});
export const cartUpdateValidation = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});
export const orderValidation = Joi.object({
  totalAmount: Joi.number().min(1),
});

export const updateProductValidation = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0),
  category: Joi.string(),
});
