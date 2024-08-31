module.exports = function (req, res, next) {
  const { url, method, ip } = req;
  const time = new Date().toLocaleTimeString();
  req.reqTime = Date.now();
  console.log("MADE BY VARUN ARORA");
  console.log(`URL: ${url}`);
  console.log(`METHOD: ${method}`);
  console.log(`IP: ${ip}`);
  console.log(`TIME: ${time}`);
  next();
};
