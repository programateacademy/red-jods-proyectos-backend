const express = require('express')
const router = express.Router('')
const {validateCreateProject}=require('../../validators/project');
const {validateCreatePutProject}=require('../../validators/putProject');
const checkAuth = require('../../middleware/auth')
 const checkRoleAuth = require('../../middleware/role')
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectState } = require('../../controller/projectController')
 

router.get('/',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjects)

router.get('/:id',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjectById)

router.post('/' , checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, createProject)

router.put('/:id',checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, updateProject)

router.put('/state/:id',checkAuth, checkRoleAuth(['admin','superAdmin']),validateCreatePutProject, updateProjectState)


module.exports = router