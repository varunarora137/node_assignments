import express from "express";
import { getShortUrl, shortURL } from "../components/urlComponent.js";
import { urlValidator } from "../middlewares/urlValidator.js";

const router = express.Router();

router.route("/:id").get(getShortUrl);
router.route("/").post(urlValidator, shortURL);

export default router;
