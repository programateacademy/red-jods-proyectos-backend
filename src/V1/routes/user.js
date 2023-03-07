const express = require('express')
const router = express.Router()
//const checkAuth = require('../middleware/auth')
//const checkRoleAuth = require('../middleware/roleAuth')
const {validateCreateUser}=require('../../validators/users');

const {getUsers, getUserById, createUser, updateUser, updateUserState} = require('../../controller/userController');

//localhot:3000/Api/v1/user  
router.get('/', getUsers)


//localhot:3000/Api/v1/user/id  
router.get('/:id', getUserById)


//localhot:3000/Api/v1/user
router.post('/',validateCreateUser,  createUser)

//localhot:3000/Api/v1/user/id
router.put('/:id',validateCreateUser,  updateUser)



router.put( '/state/:id', updateUserState)


module.exports = router