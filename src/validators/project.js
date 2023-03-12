const {check} = require('express-validator');
 const {validateResulto}= require('../helpers/validatorHelpe');
 const validator = require('validator');

 const onlyLettersAndSpaces = (value) => {
  if (value) {
    return validator.matches(value, /^[a-zA-Z\s]+$/);
  }
  return true; // Si el valor es vacío, se considera válido
}

const validateCreateProject = [
  check('userName').exists().not().isEmpty().withMessage('El campo nombre y apellido es requerido').custom(onlyLettersAndSpaces).withMessage('El campo debe contener únicamente letras y espacios'),
  check('title').exists().not().isEmpty().withMessage('El campo title es requerido').custom(onlyLettersAndSpaces).withMessage('El campo debe contener únicamente letras y espacios'),
  check('axis').exists().not().isEmpty().withMessage('El campo ejes es requerido').isIn(['Personas', 'Prosperidad','Planeta','Paz','Alianzas']).withMessage('El campo rol debe ser igual a "Personas", "Prosperidad","Planeta","Paz" o "Alianzas"'), 
  
  check('ods').isArray().withMessage('El campo ods debe ser un arreglo').custom((arreglo) => {
    arreglo.forEach((objeto) => {
      if (!objeto.url) {
        throw new Error('El campo url no puede estar vacio');
      }
      if (!validator.isURL(objeto.url)) {
        throw new Error('Url de ods no valida');
      }
      if (!['Fin de la pobreza', 'Hambre cero', 'salud y bienestar', 'Educación de calidad', 'Igualdad de genero', 'Agua limpia y saneamiento', 'Energía Asequible y no contaminante', 'Trabajo Decendente y crecimiento ecnómico', 'Industria, innovación e infraestructura', 'Reducción de las desigualdades', 'ciudades y comunidades sostenibles', 'producción y consumo responsables', 'Acción por el clima', 'Vida submarina', 'Vida de ecosistemas terrestres', 'Paz, justicia e instituciones sólidas', 'Alianzas para lograr los objetivos'].includes(objeto.nameOds)) {
        throw new Error("El campo nameods debe ser igual a 'Fin de la pobreza', 'Hambre cero', 'salud y bienestar', 'Educación de calidad', 'Igualdad de genero', 'Agua limpia y saneamiento', 'Energía Asequible y no contaminante', 'Trabajo Decendente y crecimiento ecnómico', 'Industria, innovación e infraestructura', 'Reducción de las desigualdades', 'ciudades y comunidades sostenibles', 'producción y consumo responsables', 'Acción por el clima', 'Vida submarina', 'Vida de ecosistemas terrestres', 'Paz, justicia e instituciones sólidas', 'Alianzas para lograr los objetivos'");
      }
    });
    return true;
  }),

  check('description').exists().not().isEmpty().withMessage('El campo description es requerido').custom(onlyLettersAndSpaces).withMessage('El campo debe contener únicamente letras y espacios'),
  check('indicator').exists().not().isEmpty().withMessage('El campo indicator es requerido').custom(onlyLettersAndSpaces).withMessage('El campo debe contener únicamente letras y espacios'),
  check('objective').exists().not().isEmpty().withMessage('El campo objective es requerido').custom(onlyLettersAndSpaces).withMessage('El campo debe contener únicamente letras y espacios'),
  check('img').exists().not().isEmpty().withMessage('El campo objective es requerido').isURL().withMessage('El campo img debe ser una URL válida'),
  check('doc').exists().not().isEmpty().withMessage('El campo objective es requerido').isURL().withMessage('El campo doc debe ser una URL válida'),

  check('task').isArray().withMessage('El campo task debe ser un arreglo').custom((arreglo) => {
    arreglo.forEach((objeto) => {

      if (!objeto.name ) {
        throw new Error('El campo name no debe estar vacio');
      }
      if (typeof(objeto.state)!='boolean') {
        throw new Error('El campo state debe ser un boolean');
      }
      if (!onlyLettersAndSpaces(objeto.name)) {
        throw new Error('El campo name solo puede contener nombre y espacios');
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
