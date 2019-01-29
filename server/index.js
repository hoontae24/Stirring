// :Load the Dependencies>
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// :Load  the Config
const port = process.env.PORT || 3000
// const config = require('./config')

// :Express Configuration
const app = express()

// :Setting the Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/login', (req, res) => {
  const { email, password } = req.query
  res.json({ email, password })
})

app.listen(port, () =>
  console.log(
    `\nThe Server started on port :${port} at ${new Date().toLocaleString()}\n`
  )
)
