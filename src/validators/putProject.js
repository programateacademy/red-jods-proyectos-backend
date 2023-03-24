const { check } = require("express-validator");
const { validateResulto } = require("../helpers/validatorHelpe");

const validateCreatePutProject = [
  check("emailUser")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El campo email es requerido")
    .isEmail()
    .withMessage(
      "El campo email debe ser una dirección de correo electrónico válida"
    ),
  check("state")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El campo state es requerido")
    .isBoolean()
    .withMessage("El campo state debe ser un valor booleano"),
  (req, res, next) => {
    validateResulto(req, res, next);
  },
];
module.exports = { validateCreatePutProject };
