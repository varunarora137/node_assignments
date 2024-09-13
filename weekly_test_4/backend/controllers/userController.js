import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/nodeMailer.js";
import kickbox from "kickbox";

import dotenv from "dotenv";

dotenv.config();

let kb = kickbox.client(process.env.KICKBOX_API_KEY).kickbox();

export const postUserData = async (req, res) => {
  const { name, email, gender, password } = req.body;

  kb.verify(email, async function (err, response) {
    console.log(response);
    if (response.body.result === "deliverable") {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await user.create({
        name,
        email,
        gender,
        password: hashedPassword,
      });
      sendEmail(data);
      res.send("Response Sent");
    } else {
      res.send("Not Deliverable");
    }
  });
};

export const getUserData = async (req, res) => {
  res.send("Succesful Connection Established");
};
