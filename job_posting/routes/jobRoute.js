import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobControllers.js";

const router = express.Router();

router.route("/createJob").post(createJob);

router.route("/getJobs").get(getJobs);

router.route("/updateJob/:id").patch(updateJob);

router.route("/deleteJob/:id").delete(deleteJob);

export default router;
