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
 

router.get('/',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjects)

router.get('/:email',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjectByEmail)

router.get('/title/:email/:title',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjectContainTitle)

router.post('/' , checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, createProject)

router.put('/:id',checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, updateProject)

router.put('/state/:id',checkAuth, checkRoleAuth(['admin','superAdmin']),validateCreatePutProject, updateProjectState)


module.exports = router