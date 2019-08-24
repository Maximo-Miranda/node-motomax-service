
const express = require('express')
const router = express()

const userRoutes = require('../internal/users/routes')

router.get('/', (r, w) => {
    w.send('Motomax APIRest')
})

router.use(userRoutes)

module.exports = router