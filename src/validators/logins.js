const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');

const validateCreate = [
  check('email').exists().not().isEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El campo email debe ser una dirección de correo electrónico válida'),
  check('password').exists().not().isEmpty().isLength({ min: 8, max: 18 }).withMessage('password debe tener entre 8 y 18 caracteres').matches(/^(?=.*[A-Z])(?=.*\d).*$/).withMessage('Password debe incluir al menos una letra mayúscula y un número'),
  (req, res, next)=>{
    validateResulto(req, res, next);
  }


 ]
module.exports = { validateCreate }