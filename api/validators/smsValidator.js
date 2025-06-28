const Joi = require("joi");

const smsSchema = Joi.object({
  to: Joi.string().pattern(/^(\+91[\-\s]?)?[0]?[6789]\d{9}$/).required().messages({
    "string.pattern.base": "Phone number must be a valid indian number",
    "string.empty": "to(phone) field is required",
    "any.required": "to(phone) field is required",
  }),
  // message: Joi.string().min(3).max(100).required().messages({
  //   "string.min": "Message must be 3 character long",
  //   "string.max": "Message must be less than or equal to 100",
  //   "any.required": "message field is required",
  // }),
})
  .required()
  .messages({
    "any.required": "Sms object is required",
  });

const validateSms = (sms) => {
  let { error } = smsSchema.validate(sms, { abortEarly: false });
  if (!error) return null;

  let errObj = {};
  error.details.forEach((e) => (errObj[e.path[0]] = e.message));
  return errObj;
};

module.exports = validateSms;
