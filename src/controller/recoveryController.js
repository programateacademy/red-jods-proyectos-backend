const userModel = require('../models/user')
const { encrypt } = require('../helpers/handleBcrypt')

//Recuperar Contraseña
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

module.exports = {recoveryCtrl }