const express = require("express")
const body_parser = require("body-parser")
const mongoose = require("mongoose")
const studentRouter = require("./routes/Student")
const markRouter = require("./routes/Marks")
const emailRouter = require("./routes/email")
const userRouter = require("./routes/User")


const cors = require("cors")

const PORT = 8080;

let app = express()
app.use(cors())
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())

mongoose.connect("mongodb://localhost:27017/school", {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> console.log("Mongodb Connected"))
.catch( (err)=> console.error("Mongdb Connection error: ", err));

app.use('/student', studentRouter);
app.use('/marks', markRouter);
app.use("/email", emailRouter);
app.use("/user",userRouter);


app.listen(PORT, ()=> {
    console.log(`Server running on Port ${PORT}`);
})

