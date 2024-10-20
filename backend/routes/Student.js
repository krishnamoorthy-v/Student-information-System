const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { mongoose } = require("mongoose");

router.post("", async(req, res) => {
    try {
        // console.log("student created")
        let dob = req.body.date_of_birth;
        console.log(dob);
        if(dob) {
            let ageInMilliSecond = Date.parse(dob)
            let curyear = Date.parse(new Date());
            // console.log(curyear);
            if(isNaN(ageInMilliSecond)) {
                throw new Error("Invalid date of birth");
            }
            ageInMilliSecond = curyear - ageInMilliSecond ;
            ageInYear = ageInMilliSecond/(1000*60*60*24*365.25);
            // console.log(ageInYear);
            if(ageInYear < 15) {
                throw new Error("Invalid age");
            }
            console.log(dob+" "+ageInYear);
        }
        const student = new Student(req.body);
        console.log("checked");
        student.save({runValidators: true})
        .then((result)=> {
            return res.status(200).send(result);
        })
        .catch((err)=>{
            console.log(err["name"]);
            
            if(err["code"] == 11000) {
                
                return res.status(400).send("Email Id already Exists");
            }
            else if(err["name"] == "ValidationError") {

                const messages = Object.values(err.errors).map(val => val.properties.message);
                
                return res.status(400).send( messages );
              
            }
            return res.status(400).send(err.message);
            
        });
        
    } catch(error) {
        
        return res.status(400).send(error.message);
    }
})

router.get("/all", async(req, res) => {
    try {
        const student = await Student.find();
        if(student.length == 0) {
           throw new Error("No data found");
        }
        return res.status(200).send(student);
    } catch(error) {
       return res.status(400).send(error.message);
    }
})

router.get("/:id", async(req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid student id");
        }

        const student = await Student.findById(req.params.id);
        if(!student) {
           throw new Error("Student not found");
        }
        return res.status(200).send(student);
    } catch(error) {
        return res.status(400).send(error.message);
    }
})



router.put("/:id", async(req, res) => {
    try {
        const updated_record = req.body;
        console.log(updated_record)
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid Student Id");
        } 
        let record = await Student.findOneAndUpdate({_id: req.params.id}, updated_record , {new: true});
    
        if(!record) {
            throw new Error("Student not found")
        //    return res.status(400).send({"status": "record not found"});
        } 
        return res.status(200).send( record );
    } catch(err) {
        return res.status(400).send(err.message);
    }
})


router.delete("/:id", async(req, res) => {
    try {
       
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid Student Id");
        } 
        let record = await Student.findById(req.params.id)
        console.log(record)
        if(! record) {
            throw new Error("student not found");
           
        }
        const result = await Student.deleteOne({_id: req.params.id});
       
        return res.status(200).send( {"status " : result.acknowledged});
    } catch(error) {
        return res.status(400).send(error.message);
    }
})

module.exports = router;