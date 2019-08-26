const express = require('express')
const router = express()
const path = require('path')

router.get('/', express.static(path.resolve(__dirname + '/../public')))

const userRoutes = require('../internal/users/routes')

router.use(userRoutes)

module.exports = router