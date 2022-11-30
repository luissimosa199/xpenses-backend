const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const familySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// static signup family method

familySchema.statics.signup = async function ({ name, password, address }) {

  const exist = await this.findOne({ name });

  if (exist) {
    throw Error("Family name not available");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const family = await this.create({ name, password: hash, address });

  return family;
};

// static family login method

familySchema.statics.login = async function ({ name, password }) {
  const family = await this.findOne({ name });

  if (!family) {
    throw { status: 401, message: "Incorrect family data" };
  }

  const match = await bcrypt.compare(password, family.password);

  if (!match) {
    throw { status: 401, message: "Incorrect family data" };
  }

  return family;
};

module.exports = mongoose.model("Family", familySchema);