import validator from "validator";

const options = {
  protocols: ["http", "https", "ftp"],
  require_protocol: true,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_fragments: true,
  allow_query_components: true,
  disallow_auth: false,
};
export const urlValidator = (req, res, next) => {
  const { originalURL } = req.body;
  if (validator.isURL(originalURL, options)) {
    next();
  } else {
    res.json({ message: "Invalid URL" });
  }
};
