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
 *     description: Este endpoint unicamente lo podra utilizar un usuario con rol admin
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del recurso
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
 *     description: Este endpoint unicamente lo podra utilizar un usuario con rol admin
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del recurso
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

//localhot:3000/Api/v1/user
router.post('/',checkAuth, checkRoleAuth(['superAdmin']), validateCreateUser,  createUser)

//localhot:3000/Api/v1/user/id
router.put('/:id',checkAuth, checkRoleAuth(['superAdmin']),validateCreateUser,  updateUser)

//localhot:3000/Api/v1/user/state/id
router.put( '/state/:id',checkAuth, checkRoleAuth(['superAdmin']),validateCreatePutUser, updateUserState)


module.exports = router