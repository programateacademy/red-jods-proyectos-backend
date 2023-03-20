const express = require('express')
const router = express.Router()
const {validateCreate}=require('../../validators/logins');
const {validateCreateUser}=require('../../validators/register');
const {validateForgot}=require('../../validators/forgotPassword');
const { loginCtrl, registerCtrl,forgotCtrl,recoveryCtrl } = require('../../controller/loginController')
const checkFailedLoginAttempts = require('../../middleware/failedLoginAttempts')
const checkEmail= require('../../middleware/tokenForgot')

// localhost:3000/Api/v1/login/

router.post('/', checkFailedLoginAttempts, validateCreate, loginCtrl)

// localhost:3000/Api/v1/login/register/
router.post('/register',validateCreateUser,  registerCtrl)

// localhost:3000/Api/v1/login/register/
router.post('/forgot-password',validateForgot ,  forgotCtrl)

// localhost:3000/Api/v1/login/register/
router.post('/password-recovery',checkEmail, validateCreate, recoveryCtrl)



module.exports = router
