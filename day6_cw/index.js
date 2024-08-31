const express = require("express");
const reqLogger = require("./middlewares/reqLogger.js");

const app = express();

const port = 4000;
const host = "127.0.0.1";

app.use(express.json());

app.use(reqLogger);

app.get("/", (req, res) => {
  console.log("Time Take: " + (Date.now() - req.reqTime) + "ms");
  res.status(200).send("Successful");
});

app.listen(port, host, () => console.log("Connection Successful."));
