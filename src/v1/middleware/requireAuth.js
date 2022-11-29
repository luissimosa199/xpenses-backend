const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const SECRET = process.env.SECRET;

const requireAuth = async (req, res, next) => {
  // verify auth

  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ status: 401, message: "Auth Bearer not found" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "User not authorized" });
  }
};

module.exports = requireAuth;
