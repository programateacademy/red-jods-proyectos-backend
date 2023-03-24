const { tokenForgot } = require('../helpers/ForgotToken')
const userModel = require('../models/user')
const { transporter } = require('../../config/mailer')

// Olvido la contraseña
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
        const Urlfrontend='https://';
        const emailUser = process.env.USER;
        const mailOptions = {
          from: emailUser, // sender address
          to: req.body.email, // list of receivers
          subject: 'Recuperación de contraseña de Red Jobs Projects',
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
              text-align: left;
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
          <h2>Buen Día, ${user.name}</h2>
          <p> Su solicitud de recuperación de contraseña ha sido recibida.</p>
          <p> Para restablecer su contraseña por favor visite la siguiente URL ${Urlfrontend}, ingrese el código en el campo correspondiente, tenga en cuenta que el código caducará en 5 minutos. </p>
          <h3> Usuario: ${user.email} <br>
               Código: <p> ${tokenForget} </p>
          </h3>
          <h4>Si usted NO realizó esta solicitud omita este mensaje.</h4>
          <p> Si presenta inconvenientes comuníquese con proyectos.redjods@gmail.com </p>
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
            res.send('Error al enviar correo electrónico.', error);
          } else {
            res.status(200);
            res.send('Correo electrónico. Enviado Exitosamente');
          }
        });
       
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
      res.send({ error: 'Algo ocurrio No se' })
    }
  }

module.exports = {  forgotCtrl}