import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/jobRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);

try {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
  });
  if (connection)
    app.listen(port, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
} catch (err) {
  console.log(err);
}
