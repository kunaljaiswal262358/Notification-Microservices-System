const Joi = require("joi");

const emailSchema = Joi.object({
  to: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "to field is required",
  }),
  subject: Joi.string().min(3).max(100).required().messages({
    "string.min": "Subject must be 3 character long",
    "string.max": "Subject must be less than or equal to 100",
    "any.required": "subject field is required",
  }),
  data: Joi.string().required().messages({
    "string.base": "Data should be a string",
    "any.required": "data field is required",
  }),
})
  .required()
  .messages({
    "any.required": "Email object is required",
  });

const validateEmail = (email) => {
  let { error } = emailSchema.validate(email, { abortEarly: false });
  if (!error) return null;

  let errObj = {};
  error.details.forEach((e) => (errObj[e.path[0]] = e.message));
  return errObj;
};

module.exports = validateEmail;
