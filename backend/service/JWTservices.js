const jwt = require("jsonwebtoken");

const secret = "qwertUikapdfnaudfanfdauf.ila.lkjfadfn";

const roles = {

    "admin": ["create", "read", "update", "delete"],
    "user": ["read"]

}

function generateToken(user) {
   return jwt.sign( {_id: user.id, role: user.role }, secret, {expiresIn: "1h"});
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

const authorize = (permission) => {
    return( (req, res, next) => {
        try {

        
            if(!req.headers["authorization"]) {
                throw new Error("Forbidden")
            }
            const token = req.headers["authorization"].split(" ")[1];
            const token_info = verifyToken(token);
            
            // console.log(token_info);
            // console.log(token_info["role"]);
            // console.log(roles[token_info["role"]].includes(permission));

            if(roles[token_info["role"]] && roles[token_info["role"]].includes(permission) ) {
                next();
            } else {
                throw new Error("Forbidden");
            }
        } catch(err) {
            res.status(400).send(err.message);
        }
    });
};

module.exports = {authorize, verifyToken, generateToken};