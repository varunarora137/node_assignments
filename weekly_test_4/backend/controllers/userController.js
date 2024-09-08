import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmail from "./nodeMailer.js";

export const postUserData = async (req, res) => {
  const { name, email, gender, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await user.create({
    name,
    email,
    gender,
    password: hashedPassword,
  });
  sendEmail(data);
  res.send("Response Sent");
};

export const getUserData = async (req, res) => {};
