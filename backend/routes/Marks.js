const express = require("express");
const router = express.Router();
const Marks = require("../models/Marks");
const { default: mongoose } = require("mongoose");
const Student = require("../models/Student");
const {authorize} = require("../service/JWTservices")



router.post("", authorize("create"), async(req, res) => {
    try {

        console.log("Marks created")
        let {student, math, physics, chemistry} = req.body;
        math = Number(math);
        physics = Number(physics);
        chemistry = Number(chemistry);
        
        if(!mongoose.Types.ObjectId.isValid(student)) {
            throw new Error("Invalid Student id");
        } else {
            let stud = await Student.findById(student);
            if(!stud) {
                throw new Error("Student not found");
            }
        }
        let total = math + physics + chemistry;
        let average = (total/3);
     
        console.log({... req.body, total, average });
      
        const mark = new Marks( {... req.body, total, average });
        mark.save( {runValidators: true} )
        .then( (result) => {
            return res.status(200).send(result);
        })
        .catch( (err)=> {

            if(err["name"] == "ValidationError") {
                console.log("From ValidationError");
                const messages = Object.values(err.errors).map(val => val.properties.message);
                console.log("messages")
                if(messages) {
                    return res.status(400).send( messages[0]);  
                }
                            
            }
            return res.status(400).send(err);
        });
       

    } catch(error) {
        return res.status(400).send(error.message);
    }
})



router.get("/all", authorize("read"), async(req, res) => {
    try {
        const mark = await Marks.find();
        if(mark.length == 0) {
            throw new Error("No data found")
        }
        return res.status(200).send(mark);
    } catch(error) {
       return res.status(400).send(error.message);
    }
})

router.get("/:id", authorize("read"), async(req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid mark Id");
        } 
        const result = await Marks.findById(req.params.id);
        if(!result) {
            throw new Error("Mark id not found");
        //    return res.status(400).send("not found");
        }
        return res.status(200).send(result);
    } catch(error) {
        return res.status(400).send(error.message);
    }
})

router.get("/student/:id", authorize("read"), async(req, res) => {
    try {

        // console.log(req.params.id)
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid student Id");
        } 
        
        const result = await Marks.find({student: req.params.id});
        if(result.length == 0) {
            throw new Error("No record found");
          
        }
        return res.status(200).send(result);
    } catch(error) {
        return res.status(400).send(error.message);
    }
})


router.put("/update/:id", authorize("update"), async(req, res) => {
    try {

        let {student, math, physics, chemistry} = req.body;
        math = Number(math);
        physics = Number(physics);
        chemistry = Number(chemistry);
        let total = math + physics + chemistry;
        let average = (total/3);
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid mark Id");
        } 

        let record = await Marks.findOneAndUpdate({_id: req.params.id}, {... req.body, total, average} , {new: true, runValidators: true});
    
        if(!record) {
            throw new Error("Mark not found");
        //    return res.status(400).send({"status": "record not found"});
        } 
        return res.status(200).send( record);
    } catch(err) {
        return res.status(400).send(err.message);
    }
})


router.delete("/:id", authorize("delete"), async(req, res) => {
    try {

    
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid mark Id");
        } 

        const result = await Marks.deleteOne({_id: req.params.id});
        console.log(result);
        if(result.deletedCount == 0) {
            throw new Error("Mark not found");
            // return res.status(400).send( {"status ": "record not found"});
        }
        return res.status(200).send( {"status " : result.acknowledged});
    } catch(error) {
        return res.status(400).send(error.message);
    }
})

module.exports = router;