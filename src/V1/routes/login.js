const express = require('express')
const router = express.Router()
const {validateCreate}=require('../../validators/logins');
const {validateCreateUser}=require('../../validators/users');
const { loginCtrl, registerCtrl } = require('../../controller/loginController')

// localhost:3000/Api/v1/ligin/
router.post('/', validateCreate,loginCtrl)

// localhost:3000/Api/v1/ligin/register/
router.post('/register',validateCreateUser,  registerCtrl)


module.exports = router
