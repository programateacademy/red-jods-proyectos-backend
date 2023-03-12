 const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');




const validateCreatePutProject = [
  check('state').exists().not().isEmpty().withMessage('El campo state es requerido').isBoolean().withMessage('El campo state debe ser un valor booleano'),
  (req, res, next)=>{
    validateResulto(req, res, next);
   }


 ]
module.exports = { validateCreatePutProject }