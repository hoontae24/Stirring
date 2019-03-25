// :Load the Dependencies>
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

// :Load  the Config
const port = process.env.PORT || 3000
const config = require('./config')

// :Express Configuration
const app = express()

// :Running service

const refreshPopTags = require('./controllers/TagController').refreshPopTags
refreshPopTags()
setInterval(refreshPopTags, 1000 * 60 * 60)

// :Setting the Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/static', express.static('server/uploads/'))

app.set('jwt-secret', config.secret)

app.use('/api', require('./api'))

app.listen(port, () =>
  console.log(
    `\nThe Server started on port :${port} at ${new Date().toLocaleString()}\n`
  )
)

mongoose.connect(config.mongodbUri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('Connected to mongoDB server.\n')
})
