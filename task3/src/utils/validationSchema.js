import Joi from 'joi';

const bookSchema = Joi.object ({
  title: Joi.string ().min (5).required (),
  author: Joi.string ().min (3).required (),
  price: Joi.number ().min (0).required (),
});

export default bookSchema;
