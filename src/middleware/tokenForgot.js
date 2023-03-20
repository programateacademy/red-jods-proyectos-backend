const { verifyTokenForgot } = require('../helpers/ForgotToken')

const checkAuth = async (req, res, next) => {
    try {
        //TODO: authorization: Bearer 1010101010101001010100
        const token = req.headers.authorization.split(' ').pop() //TODO:123123213
        const tokenData = await verifyTokenForgot(token)
        if (tokenData._id) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Valor erroneo!' })
        }

    } catch (e) {
        res.status(409)
        res.send({ error: 'Valor erroneo!' })
    }

}

module.exports = checkAuth
