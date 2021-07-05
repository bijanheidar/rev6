const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program"
  },
  startDate: { type: Date, required: true },
  finishDate: { type: Date, required: true },
  status: ['Apply', 'Full', 'Upcoming'],
  // teacher: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Teacher"
  // },
  teacher: { type: String, required: true }
})

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;