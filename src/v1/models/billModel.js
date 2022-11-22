const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
  name: {type: String, required: true},
  description:{type: String, required: true},
  date: {type: String, required: true},
  amount: {type: Number, required: true},
  status: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Bill', billSchema)