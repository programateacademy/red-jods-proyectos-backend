const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/auth')
const checkRoleAuth = require('../../middleware/role')
const {validateCreateUser}=require('../../validators/users');
const {validateCreatePutUser}=require('../../validators/putUser');

const {getUsers, getUserById, createUser, updateUser, updateUserState, getUserByName} = require('../../controller/userController');

//localhot:3000/Api/v1/user  
 /**
 * @swagger
 * /Api/v1/user/:
 *   get:
 *     summary: Listado de usuarios Registrados
 *     description: Este endpoint unicamente lo podra utilizar un usuario con rol super admin
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Acción  exitosa
 *       '409':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.get('/', checkAuth, checkRoleAuth(['superAdmin']),getUsers)


/**
 * @swagger
 * /Api/v1/user/{id}:
 *   get:
 *     summary: Muestra un usuario de acuerdo al Id
 *     description: Este endpoint unicamente lo podra utilizar un usuario con rol super admin
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '400':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id',checkAuth, checkRoleAuth(['superAdmin']), getUserById)


/**
 * @swagger
 * /Api/v1/user/name/{name}:
 *   get:
 *     summary: Muestra un usuario de acuerdo al nombre
 *     description: Este endpoint unicamente lo podra utilizar un usuario con rol super admin
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Nombre del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '400':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.get('/name/:name',checkAuth, checkRoleAuth(['superAdmin']), getUserByName)

/**
 * @swagger
 * /Api/v1/user:
 *   post:
 *     summary: Crear un usuari en la B.D.
 *     description: Creacion de un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '400':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.post('/',checkAuth, checkRoleAuth(['superAdmin']), validateCreateUser,  createUser)

/**
 * @swagger
 * /Api/v1/user/{_id}:
 *   put:
 *     summary: Modificar aspectos del usuario
 *     description: Actualización de alguno de los datos en la BD
 *     tags:
 *       - Users
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: ID del objeto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '400':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id',checkAuth, checkRoleAuth(['superAdmin']),validateCreateUser,  updateUser)

//localhot:3000/Api/v1/user/state/id
/**
 * @swagger
 * /Api/v1/user/state/{_id}:
 *   put:
 *     summary: Modificar aspectos del usuario
 *     description: Actualización del estado del usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: ID del objeto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '400':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.put( '/state/:id',checkAuth, checkRoleAuth(['superAdmin']),validateCreatePutUser, updateUserState)


module.exports = router