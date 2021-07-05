const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant"
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  requestDate: { type: Date, required: true },
  comment: { type: String, required: true }
})

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;