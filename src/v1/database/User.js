const mongoose = require("mongoose");
const User = require("../models/userModel");

const loginUser = async (loginData) => {
  try {

    // ??
    const user = await User.findOne({ email: loginData.email });
    // ??

    if (!user) {
      throw { status: 401, message: "Email not found" };
    }

    return user;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const signupUser = async (signupData) => {
  try {
    const user = await User.signup(signupData);
    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = { loginUser, signupUser };
