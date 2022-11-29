const mongoose = require("mongoose");
const User = require("../models/userModel");

const loginUser = async (loginData) => {
  try {

    const user = await User.login(loginData);
    return user.email;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const signupUser = async (signupData) => {
  try {
    const user = await User.signup(signupData);
    return user.email;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = { loginUser, signupUser };
