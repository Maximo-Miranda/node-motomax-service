// node_module requires
const express = require('express')
const PaymentRoutes = express()

// Internal requieres
const handlers = require('./handlers')
const auth = require('../middlewares/auth')
const role = require('../middlewares/permisson')

// Get /payments route
PaymentRoutes.get('/payments', [auth, role(['ROOT'])], handlers.IndexHandler)

// Get /payment route
PaymentRoutes.get('/payment/:id', [auth, role(['ROOT'])], handlers.GetByIDHandler)

// Create /payments route
PaymentRoutes.post('/payments', [auth, role(['ROOT'])], handlers.StoreHandler)

// Update /payments/:id route
PaymentRoutes.put('/payments/:id', [auth, role(['ROOT'])], handlers.UpdateHandler)

// Delete /payments/collections/:id route
PaymentRoutes.delete('/payments/:id', [auth, role(['ROOT'])], handlers.DeleteHandler)

// Softdelete /payments route
PaymentRoutes.delete('/payments/soft/:id', [auth, role(['ROOT'])], handlers.SoftDeleteHandler)


module.exports = PaymentRoutes