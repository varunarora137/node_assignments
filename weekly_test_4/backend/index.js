import express from "express";
import dotenv from "dotenv";
import urlRouter from "./routes/userRoute.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api", urlRouter);

try {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
  });
  if (connection) {
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  }
} catch (err) {
  console.log(err);
}
