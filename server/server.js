// Requires
const express = require('express')
const bodyParser = require('body-parser')
require('./config/config')

// Init express instance
const server = express()

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

server.get('/', (r, w) => {
    w.send('Motomax APIRest')
})

server.post('/login', (r, w) => {

    let body = r.body

    w.json(body)

})

// Start server
server.listen(process.env.PORT, () => console.log(`Motomax REST server running on port: ${process.env.PORT}`))

