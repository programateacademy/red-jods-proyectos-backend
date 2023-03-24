const { check } = require("express-validator");
const { validateResulto } = require("../helpers/validatorHelpe");

const validateForgot = [
  check("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El campo email es requerido")
    .isEmail()
    .withMessage(
      "El campo email debe ser una dirección de correo electrónico válida"
    ),
  (req, res, next) => {
    validateResulto(req, res, next);
  },
];
module.exports = { validateForgot };
