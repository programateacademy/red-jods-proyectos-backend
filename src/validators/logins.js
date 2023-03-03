const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');

const validateCreate = [
  check('name').exists().not().isEmpty(),
  check('password').exists().not().isLength({ min: 8,max:15 }).isString().notEmpty().isLength({max:15}),
  (req, res, next)=>{
    validateResulto(req, res, next);
   }


 ]
module.exports = { validateCreate }