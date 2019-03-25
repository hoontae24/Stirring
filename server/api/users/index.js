const express = require('express')
const router = express.Router()
const controller = require('../../controllers/UsersController')
const multer = require('multer')
const path = require('path')
const upload = multer({
  storage: multer.diskStorage({
    destination: 'server/uploads/profile-images/',
    filename: function(req, file, cb) {
      let extension = path.extname(file.originalname)
      let basename = path.basename(file.originalname, extension)
      cb(null, basename + '-' + Date.now() + extension)
    }
  })
})

router.post('/', controller.signup)
router.post('/password', controller.resetPassword)

router.get('/:id', controller.getUser)
router.get('/', controller.getAllUsers)
router.get('/profile-image/:id', controller.getUserProfileImage)
router.get('/email/:email', controller.checkEmail)

router.put('/interests/:userId', controller.updateInterests)
router.put('/:id', controller.update)
router.put(
  '/profile-image/:id',
  upload.fields([{ name: 'img', maxCount: 1 }]),
  controller.setUserProfileImage
)
router.put('/password/:id', controller.changePassword)

router.delete('/delete/:email', controller.deleteAccount)

module.exports = router
