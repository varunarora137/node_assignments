const express = require("express");
const morgan = require("morgan");
const validator = require("./middlewares/validator.js");

const port = 4000;

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  try {
    res.status(200).send("Succesful Connection Established");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/userData", validator, (req, res) => {
  try {
    console.log("\nUser Data Received\n");
    console.log("FullName: " + req.body.FullName);
    console.log("Email: " + req.body.Email);
    console.log("Password: " + req.body.Password);
    console.log("Phone Number: " + req.body.PhoneNumber);
    res.status(200).send("Successful");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("Connection Successful");
});
