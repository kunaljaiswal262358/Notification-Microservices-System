const validateEmail = require("../validators/emailValidator");
const validateSms = require("../validators/smsValidator");
const { emailQueue, smsQueue } = require("../queues");

const emailController = async (req, res) => {
  let email = req.body;
  const error = validateEmail(email);
  if (error) return res.status(400).send(error);

  await emailQueue.add(email)
  res.send("Email Queued");
};

const smsController = async (req, res) => {
  let sms = req.body;
  const error = validateSms(sms)
  if(error) return res.status(400).send(error);

  await smsQueue.add(sms)
  res.send("Sms Queued");
}

module.exports = { emailController, smsController };
