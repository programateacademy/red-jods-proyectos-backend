const express = require('express')
const router = express.Router('')
const {validateCreateProject}=require('../../validators/project');
const {validateCreatePutProject}=require('../../validators/putProject');
const checkAuth = require('../../middleware/auth')
 const checkRoleAuth = require('../../middleware/role')
const {
  getProjects,
  getProjectByEmail,
  createProject,
  updateProject,
  updateProjectState,
  getProjectContainTitle } = require('../../controller/projectController')

 /**
 * @swagger
 * /Api/v1/project/:
 *   get:
 *     summary: Listado de usuarios Registrados
 *     description: Este endpoint unicamente lo podra utilizar un usuario con rol admin
 *     tags:
 *       - Project
 *     responses:
 *       '200':
 *         description: Acción  exitosa
 *       '409':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.get('/',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjects)


/**
 * @swagger
 * /Api/v1/project/{email}:
 *   get:
 *     summary: Muestra un proyecto de acuerdo al email del usuario
 *     description: Este endpoint lo prodran utilizar todos los 
 *     tags:
 *       - Project
 *     parameters:
 *       - name: email
 *         in: path
 *         description: Email del recurso
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '409':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.get('/:email',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjectByEmail)


/**
 * @swagger
 * /Api/v1/project/title/{email}/{title}:
 *   get:
 *     summary: Muestra los proyectos de acuerdo al email del usurio y el titulo del proyecto
 *     description: Este endpoint lo prodran utilizar todos los 
 *     tags:
 *       - Project
 *     parameters:
 *       - name: email
 *         in: path
 *         description: email del usurio
 *         required: true
 *         schema:
 *           type: string
 *       - name: title
 *         in: path
 *         description: title del proyecto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '409':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.get('/title/:email/:title',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjectContainTitle)


/**
 * @swagger
 * /Api/v1/project/:
 *   post:
 *     summary: Crear un proyecto en la B.D.
 *     description: Creacion de un nuevo proyecto
 *     tags:
 *       - Project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '409':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.post('/' , checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, createProject)



/**
 * @swagger
 * /Api/v1/project/{_id}:
 *   put:
 *     summary: Modificar aspectos del proyecto
 *     description: Actualización de alguno de los datos de proyecto en la Base de Datos
 *     tags:
 *       - Project
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: ID del proyecto del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '409':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id',checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, updateProject)

/**
 * @swagger
 * /Api/v1/project/state/{_id}:
 *   put:
 *     summary: Modificar Estado del proyecto
 *     description: Actualización del estado del proyecto
 *     tags:
 *       - Project
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
 *             $ref: '#/components/schemas/projectState'
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '400':
 *         description: Error en la petición
 *     security:
 *       - bearerAuth: []
 */
router.put('/state/:id',checkAuth, checkRoleAuth(['admin','superAdmin']),validateCreatePutProject, updateProjectState)


module.exports = router