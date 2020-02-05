const express = require('express')
const router = express.Router()
const controller = require('../../controllers/AuthController')
const authCheck = require('../../middlewares/Auth')

router.post('/login', controller.login)

router.get('/refresh', authCheck, controller.refresh)

router.get('/check', authCheck, controller.check)

// router.get('/me', authCheck, controller.me)

module.exports = router
