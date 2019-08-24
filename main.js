// Requires
const express = require('express')
const bodyParser = require('body-parser')
require('./config/config')
require('./utils/db')

// Init express instance
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Import router
app.use(require('./router/router'))

// Start app
app.listen(process.env.PORT, () => console.log(`Motomax REST server running on port: ${process.env.PORT}`))

