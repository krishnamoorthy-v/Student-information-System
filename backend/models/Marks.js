const mongoose = require("mongoose")

const mark_schema = new mongoose.Schema (

    {
        student: {type: mongoose.Types.ObjectId, ref:'Student', required: [true, "Student id required"]},
        math: {type: Number, min: [0, 'Math score must be at least 0'], max: [100, 'Math score must be at most 100'], required: [true, "Math mark required"]},
        physics: {type: Number, min: [0, 'Physics score must be at least 0'], max: [100, 'Physics score must be at most 100'], required:[true, "Physics mark required"]},
        chemistry: {type: Number, min:[0, 'Chemistry score must be at least 0'], max:[100, 'Chemistry score must be at most 100'], required: [true, "Chemistry mark required"]},
        total: {type: Number, min:0, max:300, required: [true, "Total mark required"]},
        average: {type: Number, min:0, max:100, required:[true, "Average mark required"]}
    }

)


const Marks = mongoose.model("Marks", mark_schema);

module.exports = Marks;