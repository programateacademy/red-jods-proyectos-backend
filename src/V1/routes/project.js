const express = require('express')
const router = express.Router('')
// const checkAuth = require('../middleware/auth')
// const checkRoleAuth = require('../middleware/roleAuth')
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectState } = require('../../controller/projectController')
 

router.get('/', getProjects)

router.get('/:id', getProjectById)

router.post('/', createProject)

router.put('/:id', updateProject)

router.put('/state/:id', updateProjectState)


module.exports = router