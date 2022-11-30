const Family = require("../database/Family");

const loginFamily = async (loginData) => {
  try {

    const data = await Family.loginFamily(loginData);

    return { name: data };

  } catch (error) {
    throw error;
  }
};

const signupFamily = async (signupData) => {
  try {
    
    const data = await Family.signupFamily(signupData);

    return { name: data };

  } catch (error) {
    throw error;
  }
};

module.exports = { loginFamily, signupFamily };