const User = require('../models/user');
const { compare } = require('../helpers/handleBcrypt')

const checkFailedLoginAttempts = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email:email });
    if (!user) return res.status(401).send('Usuario no encontrado');
    if (user.failedLoginAttempts >= 3 ) {
        const resul=await compare(req.body.password, user.password);
        if(resul==false){
            return res.status(401).send('Usuario bloqueado');
        }
    }
    next();
}
module.exports = checkFailedLoginAttempts

