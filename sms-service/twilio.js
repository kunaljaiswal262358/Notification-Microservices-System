import twilio from "twilio";
import Logger from "./db/logger.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let client;
export const createTwilioClient = async () => {
  client = twilio(accountSid, authToken);
};

export async function createMessage() {

    const message = await client.messages.create({
      body: "sms_feedback_surveys",
      from: "+17372508034",
      to: "+916283146720",
    });
    return message;
}






