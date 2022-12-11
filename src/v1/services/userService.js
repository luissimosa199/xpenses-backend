const User = require("../database/User");
const { createToken } = require("../utils/createToken");

const loginUser = async (loginData) => {
  try {

    const user = await User.loginUser(loginData);
    const token = createToken(user._id);
    return { user, token };

  } catch (error) {
    throw error;
  }
};

const signupUser = async (signupData) => {
  try {
    
    const data = await User.signupUser(signupData);
    const token = createToken(data._id);
    return { email: data, token };

  } catch (error) {
    throw error;
  }
};

module.exports = { loginUser, signupUser };
