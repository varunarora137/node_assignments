import express from "express";
import dotenv from "dotenv";
import urlRouter from "./routes/urlRoute.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/url", urlRouter);

try {
  const connection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/urlShortener"
  );
  if (connection)
    app.listen(port, () => console.log(`Server started on port ${port}`));
} catch (err) {
  console.log(err);
}
