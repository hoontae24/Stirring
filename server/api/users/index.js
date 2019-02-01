const express = require('express')
const router = express.Router()
const controller = require('../../controller/users/controller')

router.post('/', controller.signup)

module.exports = router
