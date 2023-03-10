const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/auth')
const checkRoleAuth = require('../../middleware/role')
const {validateCreateUser}=require('../../validators/users');
const {validateCreatePutUser}=require('../../validators/putUser');

const {getUsers, getUserById, createUser, updateUser, updateUserState} = require('../../controller/userController');

//localhot:3000/Api/v1/user  
router.get('/', checkAuth, checkRoleAuth(['superAdmin']),getUsers)


//localhot:3000/Api/v1/user/id  
router.get('/:id',checkAuth, checkRoleAuth(['superAdmin']), getUserById)


//localhot:3000/Api/v1/user
router.post('/',checkAuth, checkRoleAuth(['superAdmin']), validateCreateUser,  createUser)

//localhot:3000/Api/v1/user/id
router.put('/:id',checkAuth, checkRoleAuth(['superAdmin']),validateCreateUser,  updateUser)

//localhot:3000/Api/v1/user/state/id
router.put( '/state/:id',checkAuth, checkRoleAuth(['superAdmin']),validateCreatePutUser, updateUserState)



module.exports = router