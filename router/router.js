// node_modules requires
const express = require('express')
const router = express()
const path = require('path')

router.get('/', express.static(path.resolve(__dirname + '/../public')))

// Internal requieres
const userRoutes = require('../internal/user/routes')
const motorcycleRoutes = require('../internal/motorcycle/routes')
const paymentCollectionRoutes = require('../internal/paymentCollection/routes')
const paymentRoutes = require('../internal/payment/routes')
const userMotorcycleRoutes = require('../internal/userMotorcycle/routes')
const maintenanceRoutes = require('../internal/maintenances/routes')

// Load routes
router.use(userRoutes)
router.use(motorcycleRoutes)
router.use(paymentCollectionRoutes)
router.use(paymentRoutes)
router.use(userMotorcycleRoutes)
router.use(maintenanceRoutes)

module.exports = router