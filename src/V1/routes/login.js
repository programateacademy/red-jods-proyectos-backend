const express = require('express')
const router = express.Router()
const {validateCreate}=require('../../validators/logins');
const {validateCreateUser}=require('../../validators/register');
const {validateForgot}=require('../../validators/forgotPassword');
const { loginCtrl, registerCtrl } = require('../../controller/loginController')
const {forgotCtrl } = require('../../controller/forgotController')
const {recoveryCtrl } = require('../../controller/recoveryController')
const checkFailedLoginAttempts = require('../../middleware/failedLoginAttempts')
const checkEmail= require('../../middleware/tokenForgot')


/**
 * @swagger
 * /Api/v1/login:
 *   post:
 *     summary: Login en el Api
 *     description: Solo se requiere nombre y contraseña, el otro dato es opcional
 *     tags:
 *       - Login
 *     requestBody:
 *       required: [name, password]
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       '200':
 *         description: Ingreso Exitoso
 *       '400':
 *         description: Error en la autenticación
 */
router.post('/', checkFailedLoginAttempts, validateCreate, loginCtrl)


/**
 * @swagger
 * /Api/v1/login/register:
 *   post:
 *     summary: Registro en la Api
 *     description: Solo se requiere nombre y contraseña, el otro dato es opcional ya que por defecto se establece user
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       '200':
 *         description: Registro Exitoso
 *       '400':
 *         description: Nombre del usuario ya existente en la BD
 */
router.post('/register',validateCreateUser,  registerCtrl)

// localhost:3000/Api/v1/login/forgot-password/
router.post('/forgot-password',validateForgot ,  forgotCtrl)

// localhost:3000/Api/v1/login/password-recovery/
router.post('/password-recovery',checkEmail, validateCreate, recoveryCtrl)



module.exports = router
