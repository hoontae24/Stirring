const express = require('express')
const router = express.Router()
const controller = require('../../controllers/CollectionsController')

router.post('/', controller.createCollection)

router.get('/', controller.getByAuthor)

router.post('/posts', controller.addPost)
router.delete('/posts', controller.subtractPost)

module.exports = router