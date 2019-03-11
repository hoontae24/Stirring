const express = require('express')
const router = express.Router()
const controller = require('../../controllers/CollectionsController')

router.post('/', controller.createCollection)
router.post('/posts', controller.addPost)

router.get('/', controller.getByAuthor)
router.get('/:ids', controller.getByIds)

router.put('/:id', controller.update)

router.delete('/posts', controller.subtractPost)
router.delete('/:id', controller.delete)

module.exports = router