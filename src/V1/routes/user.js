const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const {validateCreateUser}=require('../../validators/users');

const {getUsers, getUserById, createUser, updateUser, updateUserState} = require('../../controller/userController');

//localhot:3000/Api/v1/user  
router.get('/', checkAuth, checkRoleAuth(['admin']),getUsers)


//localhot:3000/Api/v1/user/id  
router.get('/:id',checkAuth, checkRoleAuth(['admin']), getUserById)


//localhot:3000/Api/v1/user
router.post('/',checkAuth, checkRoleAuth(['admin']), validateCreateUser,  createUser)

//localhot:3000/Api/v1/user/id
router.put('/:id',checkAuth, checkRoleAuth(['admin']),validateCreateUser,  updateUser)

//localhot:3000/Api/v1/user/state/id
router.put( '/state/:id',checkAuth, checkRoleAuth(['admin']), updateUserState)


module.exports = router