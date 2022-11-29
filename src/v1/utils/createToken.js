const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;;

const createToken = (_id) => {
    return jwt.sign({_id}, SECRET, {expiresIn: '3d'} )
}

module.exports = { createToken }