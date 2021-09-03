const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send({ message: "Invalid token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};
