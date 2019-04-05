
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('This API is working.')
})

const auths = require('./auths')
const users = require('./users')
const posts = require('./posts')
const collections = require('./collections')
const tags = require('./tags')

router.use('/auths', auths)
router.use('/users', users)
router.use('/posts', posts)
router.use('/collections', collections)
router.use('/tags', tags)

module.exports = router

