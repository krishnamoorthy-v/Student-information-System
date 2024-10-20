const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Marks = require("../models/Marks");
const Student = require("../models/Student");
const sendMail = require("../service/mail");




router.post("/mark/:id", async(req, res) => {
    try {
        console.log("from the email");
        if( !mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid Mark id");
        }
        const mark_record = await Marks.findById(req.params.id);
        // console.log(mark_record);
        if(!mark_record) {
            throw new Error("Mark record not found");
        }
        if( !mongoose.Types.ObjectId.isValid(mark_record.student)) {
            throw new Error("Invalid Student id");
        }
        const student_record = await Student.findById(mark_record.student);
        // console.log(student_record);
        if(!student_record) {
            // console.log("Record not found");
            return res.status(400).send("not found");
        } 
        // console.log("send email");
        let info =  `
        
             <table>
        <tr>
            <th>Subject</th>
            <th>Marks</th>
            
        </tr>
        <tr>
            <td>Math</td>
            <td>${mark_record.math}</td>
     
        </tr>
        <tr>
            <td>Physics</td>
            <td>${mark_record.physics}</td>
        </tr>
        <tr>
            <td>Chemistry</td>
            <td>${mark_record.chemistry}</td>
        </tr>
        <tr>
            <td>Total</td>
            <td>${mark_record.total}</td>
        </tr>
        <tr>
            <td>Average</td>
            <td>${mark_record.average}</td>
        </tr>
    </table>
        
        `;
        
        
        
    
        sendMail(student_record.email, info)
        .then( (result) => {
            // console.log("result: "+result);
            return res.status(200).send({"status ": "sended successfull"});
        })
        .catch( (error) =>{
            // console.log("Error: "+error);
            return res.status(400).send(error.message);
        })
        
        
    } catch(error) {
        return res.status(400).send(error.message);
    }

}) 

module.exports = router;