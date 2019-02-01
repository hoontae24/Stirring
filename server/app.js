// :Load the Dependencies>
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// :Load  the Config
const port = process.env.PORT || 3000
const config = require('./config')

// :Express Configuration
const app = express()

// :Setting the Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.set('jwt-secret', config.secret)

app.use('/api', require('./api'))

app.listen(port, () =>
  console.log(
    `\nThe Server started on port :${port} at ${new Date().toLocaleString()}\n`
  )
)

mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('Connected to mongoDB server.')
})
