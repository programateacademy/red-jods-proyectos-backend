const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const { tokenForgot } = require('../helpers/ForgotToken')
const userModel = require('../models/user')


//TODO: Login!
const loginCtrl = async (req, res) => {

  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    const failedLoginAttempts = user.failedLoginAttempts + 1;
    const compar = await compare(password, user.password); //TODO: Contraseña!

    //TODO JWT 👉
    const tokenSession = await tokenSign(user) //TODO: 2d2d2d2d2d2d2

    if (compar && user.state == true) { //TODO Contraseña es correcta!
      res.status(200)
      res.send({
        data: user,
        tokenSession
      })
      user.failedLoginAttempts = 0;
      user.save()
      return
    }

    if (!compar) {
      user.failedLoginAttempts = failedLoginAttempts;
      user.save()
      res.status(409)
      res.send({
        error: 'Invalid password'
      })
      return
    }
    if (!user.state) {
      res.status(409)
      res.send({
        error: 'Inactivo'
      })
      return
    }

  } catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
  }
}
// Olvidar la contraseña
const forgotCtrl = async (req, res) => {
  try {

    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      res.status(409)
      res.send({
        error: 'Inexistente'
      })
      return
    }

    //TODO JWT 👉
    const tokenForget = await tokenForgot(user) //TODO: 2d2d2d2d2d2d2
    if (user.state == true) { //TODO Contraseña es correcta!
      res.status(200);
      res.send({
        email: user.email,
        tokenForget
      })
      return
    }
    if (!user.state) {
      res.status(409)
      res.send({
        error: 'Inactivo'
      })
      return
    }

  } catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
  }
}


const recoveryCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHash = await encrypt(password);
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    } else {
      user.password = passwordHash;
      const resUpdate = await userModel.findOneAndUpdate(
        { email: email },
        user,
        { new: true }
      );
      res.status(200).json(resUpdate);
    }
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};


//TODO: Registramos usuario!
const registerCtrl = async (req, res) => {
  try {
    //TODO: Datos que envias desde el front (postman)
    const { name, last_name, email, password, phone, role, state } = req.body

    const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!
    const registerUser = await userModel.create({
      name,
      last_name,
      email,
      phone,
      role,
      state,
      password: passwordHash
    })
    res.status(200)
    res.send({ data: registerUser })

  } catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
  }
}



module.exports = { loginCtrl, registerCtrl, forgotCtrl, recoveryCtrl }
