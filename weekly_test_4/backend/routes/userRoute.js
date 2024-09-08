import express from "express";
import { postUserData, getUserData } from "../controllers/userController.js";

const router = express.Router();

router.route("/postUserData").post(postUserData);
router.route("/getUserData").get(getUserData);

export default router;
