require("dotenv").config();
const express = require("express");
const cors = require('cors')
const connectToDB = require("./config/db");
const notificationRoutes = require('./routes/notificationRoutes')
const logRoutes = require('./routes/logRoutes')

const app = express();

connectToDB();

app.use(cors())
app.use(express.json())
app.use("/api/notify",notificationRoutes)
app.use("/api/logs", logRoutes)
app.use((err, req, res, next) => {
    res.status(500).send({
        error: err.message
    })
})

const port = 5000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
