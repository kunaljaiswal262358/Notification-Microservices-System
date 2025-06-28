const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  type: {type: String, enum: ["email", "sms", "push"], required: true},
  to: { type: String, required: true },
  status: {type: String, enum: ["success", 'failed'], required: true},
  timestamp: {type: Date, default: Date.now}
});

const Log = mongoose.model("Log", logSchema)

module.exports = Log;