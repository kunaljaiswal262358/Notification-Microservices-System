const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFIED_SID;
const client = twilio(accountSid, authToken);

const sendSms = async (sms) => {
  const { to, message } = sms;

  try {
    await client.verify.v2.services(verifySid)
        .verifications
        .create({to, channel: 'sms'})
    console.log("Sms(OTP) sent");
  } catch (err) {
    console.log("Sms Error", err)
  }
};

module.exports = sendSms;
