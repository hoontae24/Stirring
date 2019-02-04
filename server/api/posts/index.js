const express = require('express')
const router = express.Router()
const controller = require('../../controller/PostsController')
const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: 'server/uploads/posts/'
  })
})

router.post('/', upload.fields([{ name: 'img', maxCount: 1 }]), controller.post)

module.exports = router
