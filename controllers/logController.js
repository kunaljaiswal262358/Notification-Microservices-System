const Log = require("../models/Log");

const getLogs = async (req, res) => {
  const logs = await Log.find().sort({timestamp: -1});
  res.send(logs)
}

const deleteLogs = async (req, res) => {
  await Log.deleteMany({});
  res.send("All logs deleted")
}

module.exports = { getLogs, deleteLogs };