const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {generateToken} = require("../service/JWTservices");




router.post("/signup", async(req, res) => {
    try {

        const {email, password} = req.body;
        const data = new User({email, password});
        data.save({runValidators: true})
        .then( (result) => {
           return res.status(200).send(result);
        })
        .catch( (err) => {
            console.log(err["name"]);
            if(err["code"] == 11000) {
                return res.status(400).send("Email Id already Exists");
            }
            else if(err["name"] == "ValidationError") {
                const messages = Object.values(err.errors).map(val => val.properties.message);
                return res.status(400).send( messages[0] ); 
            }
            res.status(400).send(err.message);
        })

    } catch( err){
       return res.status(400).send(err.message);
    }
})

router.post("/login", async(req, res) => {
    try {
        console.log(req.body);
        const {email, password, role} = req.body;
        const user = await User.findOne({email});
        console.log(user);
        if( !user || user.role != role ) {
            throw new Error("Invalid login");
        }
        if( !user || !user.isValidPassword(password) ) {
            throw new Error("Invalid login id and password");
        } 
        const token = generateToken(user);
        return res.status(200).json({token});
        
    } catch( err) {
        return res.status(400).send(err.message);
    }
})



module.exports = router;

