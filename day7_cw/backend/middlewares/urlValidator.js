import validator from "validator";

export const urlValidator = (req, res, next) => {
  const { originalURL } = req.body;
  if (validator.isURL(originalURL)) {
    next();
  } else {
    res.json({ message: "Invalid URL" });
  }
};
