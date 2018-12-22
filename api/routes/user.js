const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const Authenticate = require('../middleware/authentication')

router.post('/login', userController.loginUser)

router.post('/register', userController.registerController)

router.get('/', Authenticate, userController.getAllUser)

module.exports = router