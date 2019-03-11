const express = require('express')
const router = express.Router()
const controller = require('../../controllers/UsersController')

router.post('/', controller.signup)

router.get('/:id', controller.getUser)
router.get('/', controller.getAllUsers)
router.get('/profile-image/:id', controller.getUserProfileImage)

router.put('/:id', controller.update)

module.exports = router
