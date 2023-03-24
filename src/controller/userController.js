const { transporter } = require('../../config/mailer')
const userModel = require("../models/user");
const { encrypt } = require("../helpers/handleBcrypt");

// Listar usuario
const getUsers = async (req, res) => {
  try {
    const listAll = await userModel.find({});
    res.status(200).json(listAll);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};
//Listar usuarios por id
const getUserById = async (req, res) => {
  try {
    const one = await userModel.findById(req.params.id);
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//Listar usuarios por name
const getUserByName = async (req, res) => {
  try {
    const one = await userModel.find({ name: req.params.name });
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//Crear usuario 
const createUser = async (req, res) => {
  try {
    //TODO: Datos que envias desde el front (postman)
    const { name, last_name, email, password, phone, role, state } = req.body;
    const passwordHash = await encrypt(password); //TODO: (123456)<--- Encriptando!!
    const registerUser = await userModel.create({
      name,
      last_name,
      email,
      phone,
      role,
      state,
      password: passwordHash,
    });
    const Urlfrontend='https://';
    const emailUser = process.env.USER;
    const mailOptions = {
      from: emailUser, // sender address
      to: email, // list of receivers
      subject: 'Credenciales de Red Jobs Projects',
      html: `
      <!DOCTYPE html>
    <html>
      <head>
      <style>
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
      html,
      body {
          width: 100%;
          color: black;
      }
      header{
          margin-bottom: 0.5rem;
      }
      img{
          width: 100%;
      }
      h1 {
          padding: 1rem;
          text-align: center;
      }
      p {
          padding: 1rem;
          font-size: 16px;
          line-height: 1.5;
          text-align: justify;

      }
      h3{
          padding: 1rem;
          text-align: center;
      }
      h2,h4{
          padding: 1rem;
      }
      footer{
          margin-top: 0.5rem;
      }
  </style>
      </head>
      <header>
    <img src="https://firebasestorage.googleapis.com/v0/b/redjodsproject.appspot.com/o/msg-960307956-25994.jpg?alt=media&token=116b886d-4f58-4252-a26d-e9e0eba8081d"
        alt="">
     </header>
      <body>
      <h1> BIENVENIDOS A RED JODS PROYECTOS </h1>
      <h2>Buen Día, ${name} ${last_name}</h2>
      <p>Gracias por ser parte de RED JODS PROYECTOS, ahora puedes iniciar sesión ingresando a la plataforma ${Urlfrontend}
          con las siguientes credenciales: </p>
      <h3>Usuario: ${email} <br>
          Contraseña: ${password}
      </h3>
      <h4>Información sobre la plataforma:</h4>
      <p> Si presenta inconvenientes comuniquese con proyectos.redjods@gmail.com
      </p>
      </body>
      <footer>
    <img src="https://firebasestorage.googleapis.com/v0/b/redjodsproject.appspot.com/o/Footer%20Colores.png?alt=media&token=b3909b32-e5f8-48d7-9ec9-0d0d2842cd7d"
        alt="">
</footer>
    </html>
    `
    };
    // Enviar el correo electrónico utilizando el transporte SMTP
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(409)
        res.send('Error al enviar correo electrónico.' , error);
      } else {
        res.status(200);
        res.send({ data: registerUser });
      }
    });

} catch (e) {
  res.status(500);
  res.send({ error: "Correo Ya Existente" });
}
};

//actualizar usuario
const updateUser = async (req, res) => {
  const { name, last_name, email, phone, role, state } = req.body;
  const id = req.params.id;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el user" });
    }

    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    }
    user.name = name;
    user.last_name = last_name;
    user.email = email;
    user.phone = phone;
    user.role = role;
    user.state = state;
    user.save((err, userActualizado) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el user" });
      }
      res.status(200);
      res.json(userActualizado);
    });
  });
};

//Actualizar estado del usuario
const updateUserState = async (req, res) => {
  const id = req.params.id;
  const state = req.body.state;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el user" });
    }

    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    }
    user.state = state;
    user.save((err, userActualizado) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el user" });
      }
      res.status(200);
      res.json(userActualizado);
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserState,
  getUserByName,
};
