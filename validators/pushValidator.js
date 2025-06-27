const Joi = require("joi");

const pushSchema = Joi.object({
  to: Joi.string().required().messages({
    "any.required": "to field is required",
  }),
  title: Joi.string().min(3).max(100).required().messages({
    "string.min": "Title must be 3 character long",
    "string.max": "Title must be less than or equal to 100",
    "any.required": "title field is required",
  }),
  message: Joi.string().required().messages({
    "string.base": "message should be a string",
    "any.required": "message field is required",
  }),
})
  .required()
  .messages({
    "any.required": "Push object is required",
  });

const validatePush = (push) => {
  let { error } = pushSchema.validate(push, { abortEarly: false });
  if (!error) return null;

  let errObj = {};
  error.details.forEach((e) => (errObj[e.path[0]] = e.message));
  return errObj;
};

module.exports = validatePush;
