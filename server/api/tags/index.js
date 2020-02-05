const express = require('express')
const router = express.Router()
const controller = require('../../controllers/TagController')

router.post('/:word', controller.push)
router.get('/top5', controller.getTop5)

module.exports = router
