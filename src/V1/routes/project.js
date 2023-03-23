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
 
// localhost:3000/Api/v1/project/
router.get('/',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjects)
// localhost:3000/Api/v1/project/:email
router.get('/:email',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjectByEmail)
// localhost:3000/Api/v1/project/title/:email/:title
router.get('/title/:email/:title',checkAuth, checkRoleAuth(['admin','user','superAdmin']), getProjectContainTitle)
// localhost:3000/Api/v1/project/
router.post('/' , checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, createProject)
// localhost:3000/Api/v1/project/
router.put('/:id',checkAuth, checkRoleAuth(['admin','superAdmin']), validateCreateProject, updateProject)
// localhost:3000/Api/v1/project/state/:id
router.put('/state/:id',checkAuth, checkRoleAuth(['admin','superAdmin']),validateCreatePutProject, updateProjectState)


module.exports = router