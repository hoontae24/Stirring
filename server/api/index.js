const express = require('express')
const router = express.Router()

const auth = require('./auth')
const users = require('./users')
const posts = require('./posts')
const collections = require('./collections')

router.get('/', (req, res) => {
  res.send('This API is working.')
})

router.use('/auth', auth)
router.use('/users', users)
router.use('/posts', posts)
router.use('/collections', collections)

module.exports = router
