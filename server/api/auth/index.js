const express = require('express')
const router = express.Router()
const controller = require('../../controller/AuthController')
const authCheck = require('../../middlewares/Auth')

router.post('/login', controller.login)

router.get('/refresh', authCheck, controller.refresh)

router.get('/check', authCheck, controller.check)

module.exports = router
