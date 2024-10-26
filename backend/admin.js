const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://localhost:27017/school", {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> console.log("Mongodb Connected"))
.catch( (err)=> console.error("Mongdb Connection error: ", err));

async function createAdmin() {
    try {
        

        const email = "admin@gmail.com";
        const password = "admin";
        const role = "admin";

        const user = new User({email, password, role})
        
        console.log(await user.save());
    
        console.log("user created successfully")
   

    } catch(err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }

}

createAdmin();