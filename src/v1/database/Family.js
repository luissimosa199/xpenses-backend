const Family = require("../models/familyModel");

const loginFamily = async (loginData) => {
  try {

    const family = await Family.login(loginData);
    return family.name;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const signupFamily = async (signupData) => {
  try {
    const family = await Family.signup(signupData);
    return family.name;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = { loginFamily, signupFamily };