const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport( {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "digitaloutpasssystem@gmail.com",
        pass: "bqra bdll hvxz obzn"
    }
});



const sendMail = (email, info) =>{
    return new Promise( (resolve, reject) => {

        transporter.sendMail( {

            from: "clashkrishnamvp@gmail.com",
            to: email,
            subject: "Exam Result",
            html: info
    
        }, (error, info) => {
            if(error) {
                reject( {status: false, error: error});
            } else {
                resolve( {status: true, info: info.response });
            }
        })


    })
    
}

module.exports = sendMail;