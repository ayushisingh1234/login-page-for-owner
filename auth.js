const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  //console.log(token);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded =await jwt.verify(token, config.TOKEN_KEY);
    //console.log(decoded);
    req.user = decoded;

  } catch (err) {
      console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken; 