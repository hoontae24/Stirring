const express = require('express')
const router = express.Router()
const controller = require('../../controller/auth/controller')
const authMiddleware = require('../../middlewares/auth')

router.post('/login', controller.login)

router.get('/refresh', authMiddleware, controller.refresh)

router.use('/check', authMiddleware)
router.get('/check', controller.check)

module.exports = router
