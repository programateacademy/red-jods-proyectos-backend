const express = require('express')
const router = express.Router()
//const checkAuth = require('../middleware/auth')
//const checkRoleAuth = require('../middleware/roleAuth')
const {getUsers, getUserById, createUser, updateUser, updateUserState} = require('../../controller/userController');

  
router.get('/', getUsers)



router.get('/:id', getUserById)



router.post('/',  createUser)


router.put('/:id',  updateUser)



router.put( '/:id', updateUserState)


module.exports = router