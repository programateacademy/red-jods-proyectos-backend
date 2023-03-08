const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');
 const validator = require('validator');

const validateCreateProject = [
  check('userName').exists().not().isEmpty().withMessage('El campo name es requerido').isAlpha().withMessage('El campo name solo debe contener letras'),
  check('title').exists().not().isEmpty().withMessage('El campo title es requerido').isAlpha().withMessage('El campo title solo debe contener letras'),
  check('axis').exists().not().isEmpty().withMessage('El campo ejes es requerido').isIn(['Personas', 'Prosperidad','Planeta','Paz','Alianzas']).withMessage('El campo rol debe ser igual a "Personas", "Prosperidad","Planeta","Paz" o "Alianzas"'),  check('ods').exists().not().isEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El campo email debe ser una dirección de correo electrónico válida'),
  
  check('ods').isArray().withMessage('El campo ods debe ser un arreglo').custom((arreglo) => {
    arreglo.forEach((objeto) => {
      if (!validator.isURL(objeto.url) && !objeto.url) {
        throw new Error('El campo url debe ser una URL válida');
      }
      if (!validator.isAlpha(objeto.nameOds) && !objeto.nameOds ) {
        throw new Error('El campo name solo debe contener letras');
      }
    });
    return true;
  }),

  check('description').exists().not().isEmpty().withMessage('El campo description es requerido').isAlpha().withMessage('El campo description solo debe contener letras'),
  check('indicator').exists().not().isEmpty().withMessage('El campo indicator es requerido').isAlpha().withMessage('El campo indicator solo debe contener letras'),
  check('objective').exists().not().isEmpty().withMessage('El campo objective es requerido').isAlpha().withMessage('El campo objective solo debe contener letras'),
  check('img').exists().not().isEmpty().withMessage('El campo objective es requerido').isURL().withMessage('El campo img debe ser una URL válida'),
  check('doc').exists().not().isEmpty().withMessage('El campo objective es requerido').isURL().withMessage('El campo img debe ser una URL válida'),

  check('task').isArray().withMessage('El campo task debe ser un arreglo').custom((arreglo) => {
    arreglo.forEach((objeto) => {
      if (!validator.isBoolean(objeto.state) && !objeto.state) {
        throw new Error('El campo url debe ser un valor booleano');
      }
      if (!validator.isAlpha(objeto.name) && !objeto.name ) {
        throw new Error('El campo name solo debe contener letras');
      }
    });
    return true;
  }),

  check('state').exists().not().isEmpty().withMessage('El campo state es requerido').isBoolean().withMessage('El campo state debe ser un valor booleano'),
  (req, res, next)=>{
    validateResulto(req, res, next);
   }


 ]
module.exports = { validateCreateProject }
