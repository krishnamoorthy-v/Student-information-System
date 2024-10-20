const mongoose = require("mongoose")

const student_schema = new mongoose.Schema (

    {
        name: {type: String, required: [true, "Student name is required"]},   
        gender: {type:String, required: [true,"Gender is required"]},   
        date_of_birth: {type: Date, required: [true, "Date of birth is require"]},
        email: {type:String, require: [true, "Email is required"], unique:true, match:[/^\S+@\S+\.\S+$/, 'Please use a valid email address.']},
        createdAt: {type: Date, default: Date.now},

    }
)


const Student = mongoose.model("Student", student_schema);

module.exports = Student;