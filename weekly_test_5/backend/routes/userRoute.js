import express from "express";
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Succesful Connection Established");
});

router.route("/postUserData").post((req, res) => {
  console.log(req.body);
  res.status(201).send("Information Received Successfully.");
});

export default router;
