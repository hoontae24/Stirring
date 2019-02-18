const express = require('express')
const router = express.Router()
const controller = require('../../controllers/PostsController')
const multer = require('multer')
const path = require('path')
const upload = multer({
  storage: multer.diskStorage({
    destination: 'server/uploads/posts/',
    filename: function(req, file, cb) {
      let extension = path.extname(file.originalname)
      let basename = path.basename(file.originalname, extension)
      cb(null, basename + '-' + Date.now() + extension)
    }
  })
})

router.post(
  '/',
  upload.fields([{ name: 'img', maxCount: 1 }]),
  controller.uploadPost
)

router.get('/', controller.getAll)

router.get('/:id', controller.getOne)

router.put('/:id', controller.update)

module.exports = router
