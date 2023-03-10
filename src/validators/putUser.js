const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');

const validateCreatePutUser = [
  check('name').isString().custom((value) => {
  if (value !== '') {
    throw new Error('El campo debe estar vacío');
  }
  return true;
}),
check('emai').isString().custom((value) => {
  if (value !== '') {
    throw new Error('El campo debe estar vacío');
  }
  return true;
}),
check('password').isString().custom((value) => {
  if (value !== '') {
    throw new Error('El campo debe estar vacío');
  }
  return true;
}),
  check('phone').isNumeric().withMessage('El campo phone debe ser un valor numérico').isLength({ min: 0, max: 0 }).withMessage('El campo phone debe estar vacio'),
  check('role').exists().not().isEmpty().withMessage('El campo rol es requerido').isIn(['admin', 'user','superAdmin']).withMessage('El campo rol debe ser igual a "admin" o "user"'),
  check('state').exists().not().isEmpty().withMessage('El campo state es requerido').isBoolean().withMessage('El campo state debe ser un valor booleano'),
  (req, res, next)=>{
    validateResulto(req, res, next);
   }


 ]
module.exports = { validateCreatePutUser }
