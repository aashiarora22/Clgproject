
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Please login first");
  }

  try {
    const user = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}

module.exports = auth;
