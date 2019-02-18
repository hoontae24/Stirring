const express = require('express')
const router = express.Router()
const controller = require('../../controllers/UsersController')

router.post('/', controller.signup)

router.get('/:id', controller.getUser)

router.put('/:id', controller.update)

module.exports = router
