const User = require("../database/User");

const loginUser = async (loginData) => {
  try {
    const data = await User.loginUser(loginData);
    return data;
  } catch (error) {
    throw error;
  }
};

const signupUser = async (signupData) => {
  try {
    const data = await User.signupUser(signupData);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { loginUser, signupUser };
