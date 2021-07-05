const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 10, max: 120, required: true },
  email: { type: String, required: true, unique: true }, //`email` must be unique
  phone: { type: String, required: true }
  
});

//create another indexes besides _id
// applicantSchema.index({email:1});
const Applicant=mongoose.model("Applicant",applicantSchema);
module.exports = Applicant;