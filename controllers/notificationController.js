const validateEmail = require("../validators/emailValidator");
const validateSms = require("../validators/smsValidator");
const validatePush = require("../validators/pushValidator");
const emailQueue = require('../queues/emailQueue');
const smsQueue = require("../queues/smsQueue");
const pushQueue = require("../queues/pushQueue");

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

const pushController = async (req, res) => {
  let push = req.body;
  const error = validatePush(push)
  if(error) return res.status(400).send(error);

  await pushQueue.add(push)
  res.send("Push Queued");
}

module.exports = { emailController, smsController, pushController };
