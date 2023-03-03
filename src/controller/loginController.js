const { encrypt } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/user')

//TODO: Login!
const loginCtrl = async (req, res) => {
    try {
        const {name, password} = req.body
        const user = await userModel.findOne({ name })

        if (!user) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = ()=>{
          if (password===user.password){
            return true;
          }else{
            return false;
          }
        } //TODO: Contraseña!

        //TODO JWT 👉
        const tokenSession = await tokenSign(user) //TODO: 2d2d2d2d2d2d2

        if (checkPassword) { //TODO Contraseña es correcta!
            res.send({
                data: user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
      res.status(500)
      res.send({ error: 'Algo ocurrio' })
    }
}

//TODO: Registramos usuario!
const registerCtrl = async (req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const { password, name,  } = req.body

        const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!
        const registerUser = await userModel.create({
            name,
            password: passwordHash
        })

        res.send({ data: registerUser })

    } catch (e) {
      res.status(500)
      res.send({ error: 'Algo ocurrio' })
    }
}



module.exports = { loginCtrl, registerCtrl }
