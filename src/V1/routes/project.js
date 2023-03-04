const express = require('express')
const router = express.Router('')
// const checkAuth = require('../middleware/auth')
// const checkRoleAuth = require('../middleware/roleAuth')
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject } = require('../../controller/projectController')
 

router.get('/', getProjects)

router.get('/:id', getProject)

router.post('/', createProject)

router.put('/:id', updateProject)

router.delete('/', deleteProject)


module.exports = router