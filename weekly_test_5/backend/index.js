import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

try {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
  });
  if (connection)
    app.listen(port, () => console.log(`Server started on port ${port}`));
} catch (err) {
  console.log(err);
}
