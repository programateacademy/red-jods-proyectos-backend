const express = require('express')
const router = express.Router()

const { loginCtrl, registerCtrl } = require('../controller/loginController')



router.post('/', loginCtrl)

router.post('/register', registerCtrl)

module.exports = router
