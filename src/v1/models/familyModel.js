const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");

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

familySchema.statics.login = async function ({ name, password, user_id }) {
  const family = await this.findOne({ name });

  if (!family) {
    throw { status: 401, message: "Incorrect family name" };
  }

  const match = await bcrypt.compare(password, family.password);

  if (!match) {
    throw { status: 401, message: "Incorrect family password" };
  }

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    throw { status: 404, message: "ID not valid" };
  }

  // const familyId = family._id;

  const familyIsAdded = await User.find({families: family._id});

  if(!familyIsAdded.length === 0){
    throw {
      status: 403,
      message: "Family already added",
    };
  }

  const user = await User.findOneAndUpdate(
    { _id: user_id },
    { $push: { families: family._id } }
  );

  if (!user) {
    throw {
      status: 404,
      message: "User not found, you must be logged in before you add a family",
    };
  }

  return family;
};

module.exports = mongoose.model("Family", familySchema);
