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
 *     description: Solo se requiere email y contraseñal
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
 *       '409':
 *         description: Error en la autenticación
 */
router.post('/', checkFailedLoginAttempts, validateCreate, loginCtrl)


/**
 * @swagger
 * /Api/v1/login/register:
 *   post:
 *     summary: Registro en la Api
 *     description: Todos los datos son requeridos
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: Registro Exitoso
 *       '409':
 *         description: email ya existente en la Base de Datos
 */
router.post('/register',validateCreateUser,  registerCtrl)


/**
 * @swagger
 * /Api/v1/login/forgot-password:
 *   post:
 *     summary: Recovery password 
 *     description: Solo se requiere el email 
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgot'
 *     responses:
 *       '200':
 *         description: Envio de correo Exitosos
 *       '409':
 *         description: Usuario no existente
 */
router.post('/forgot-password',validateForgot ,  forgotCtrl)

/**
 * @swagger
 * /Api/v1/login/password-recovery:
 *   post:
 *     summary: Recovery password 
 *     description: Solo se requiere email y contraseña
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
 *       '409':
 *         description: Nombre del usuario ya existente en la BD
 *     security:
 *       - bearerAuth: []
 */

router.post('/password-recovery',checkEmail, validateCreate, recoveryCtrl)



module.exports = router
