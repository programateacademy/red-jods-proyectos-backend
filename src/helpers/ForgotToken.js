const jwt = require('jsonwebtoken') //TODO : 😎

const tokenForgot = async (user) => { //TODO: Genera Token
    return jwt.sign(
        {
            _id: user._id, //TODO: <---
            email: user.email
        }, 
        process.env.JWT_SECRET_FORGOT, //TODO ENV
        {
            expiresIn: "7m", //TODO tiempo de vida
        }
    );
}

const verifyTokenForgot = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_FORGOT)
    } catch (e) {
        return null
    }
}

const decodeForgot = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}



module.exports = { tokenForgot, decodeForgot, verifyTokenForgot }
