const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  families: [{ type: Schema.Types.ObjectId }],
});

// static signup method

userSchema.statics.signup = async function ({ email, password, name }) {
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email not available");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, name });

  // filtrar la password
  return {
    email: user.email,
    families: user.families,
    name: user.name,
    _id: user._id,
  };
};

// static login method

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });

  if (!user) {
    throw { status: 401, message: "Incorrect login data" };
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw { status: 401, message: "Incorrect login data" };
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
