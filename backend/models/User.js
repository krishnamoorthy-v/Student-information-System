const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user_schema =  new mongoose.Schema( {

    email: {type:String, require: [true, "Email is required"], unique:true, match:[/^\S+@\S+\.\S+$/, 'Please use a valid email address.']},
    password: {type: String, require: [true, "Password is required"]},
    role: {type: String, default: "user"}
})

user_schema.pre( "save", async function(next){

    if(!this.isModified("password")) {
        return next();
    } 
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

user_schema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', user_schema )
module.exports = User;