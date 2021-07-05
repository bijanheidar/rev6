const mongoose = require("mongoose");

const programSchema= new mongoose.Schema({
  title: {type: String, required: true},
  desc: {type: String, required: true},
  imageURL: { type: String, required: true },
});

const Program = mongoose.model("Program",programSchema);
module.exports = Program;