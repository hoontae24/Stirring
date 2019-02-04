const express = require('express')
const router = express.Router()
const controller = require('../../controller/UsersController')

router.post('/', controller.signup)

module.exports = router
