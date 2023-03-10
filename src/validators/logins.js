const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');

const validateCreate = [
  check('name').exists().not().isEmpty().withMessage('El campo name es requerido').isAlpha().withMessage('El campo name solo debe contener letras'),
  check('password').exists().not().isEmpty().isLength({ min: 8, max: 18 }).withMessage('password debe tener entre 8 y 18 caracteres').matches(/^(?=.*[A-Z])(?=.*\d).*$/).withMessage('password debe incluir al menos una letra mayúscula y un número'),
  (req, res, next)=>{
    validateResulto(req, res, next);
  }


 ]
module.exports = { validateCreate }