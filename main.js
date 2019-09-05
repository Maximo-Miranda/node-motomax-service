// Requires
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./config/config')
require('./utils/db')

// Init express instance
const app = express()

// Enable cors
app.use(cors())

app.use(fileUpload())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Import router
app.use(require('./router/router'))

// Start app
app.listen(process.env.PORT, () => console.log(`Motomax REST server running on port: ${process.env.PORT}`))