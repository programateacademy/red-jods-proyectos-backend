const express = require('express')
const router = express.Router()
//const checkAuth = require('../middleware/auth')
//const checkRoleAuth = require('../middleware/roleAuth')
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../../controller/userController');

  
router.get('/', getUsers)



router.get('/:id', getUser)



router.post('/',  createUser)


router.put('/:id',  updateUser)



router.delete('/', deleteUser)


module.exports = router