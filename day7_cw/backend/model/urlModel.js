import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalURL: {
    type: "string",
    required: true,
  },
  nanoID: {
    type: "string",
    required: true,
  },
});

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;
