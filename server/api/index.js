const express = require('express')
const router = express.Router()

const auth = require('./auth')
const users = require('./users')
const posts = require('./posts')

router.get('/', (req, res) => {
  res.send('This API is working.')
})

router.use('/auth', auth)
router.use('/users', users)
router.use('/posts', posts)

module.exports = router
