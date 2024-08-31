const express = require("express");
const morgan = require("morgan");

const app = express();

const port = 4000;
const host = "127.0.0.1";

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  // console.log("Time Take: " + (Date.now() - req.reqTime) + "ms");
  res.status(200).send("Successful");
});

app.listen(port, host, () => console.log("Connection Successful."));
