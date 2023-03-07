const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');

const validateCreateUser = [
  check('name').exists().not().isEmpty().withMessage('El campo name es requerido').isAlpha().withMessage('El campo name solo debe contener letras'),
  check('email').exists().not().isEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El campo email debe ser una dirección de correo electrónico válida'),
  check('password').exists().not().isEmpty().isLength({ min: 8, max: 18 }).withMessage('password debe tener entre 8 y 18 caracteres').matches(/^(?=.*[A-Z])(?=.*\d).*$/).withMessage('password debe incluir al menos una letra mayúscula y un número'),
  check('phone').exists().not().isEmpty().withMessage('El campo phone es requerido').isNumeric().withMessage('El campo phone debe ser un valor numérico').isLength({ min: 10, max: 10 }).withMessage('El campo phone debe tener una longitud de 10 dígitos'),
  check('role').exists().not().isEmpty().withMessage('El campo rol es requerido').isIn(['admin', 'user']).withMessage('El campo rol debe ser igual a "admin" o "user"'),
  check('state').exists().not().isEmpty().withMessage('El campo state es requerido').isBoolean().withMessage('El campo state debe ser un valor booleano'),
  (req, res, next)=>{
    validateResulto(req, res, next);
   }


 ]
module.exports = { validateCreateUser }
