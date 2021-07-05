const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    imageURL: { type: String},
    background: { type: String, required: true },
    email: { type: String },
    phone: { type: String }
})

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;