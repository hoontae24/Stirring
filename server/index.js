const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`\nThe Server started on port :${port} at ${new Date().toLocaleString()}\n`))
