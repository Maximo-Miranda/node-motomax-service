// node_module requires
const express = require('express')
const PaymentCollectionRoutes = express()

// Internal requieres
const handlers = require('./handlers')
const auth = require('../middlewares/auth')
const role = require('../middlewares/permisson')

// Get /payments/collections route
PaymentCollectionRoutes.get('/payments/collections', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.IndexHandler)

// Get /payment/collection/:id route
PaymentCollectionRoutes.get('/payment/collection/:id', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.GetByIDHandler)

// Create /payments/collections route
PaymentCollectionRoutes.post('/payments/collections', [auth, role(['ROOT', 'ADMINISTRATOR', 'DRIVER'])], handlers.StoreHandler)

// Update /payments/collections/:id route
PaymentCollectionRoutes.put('/payments/collections/:id', [auth, role(['ROOT'])], handlers.UpdateHandler)

// Delete /payments/collections/:id route
PaymentCollectionRoutes.delete('/payments/collections/:id', [auth, role(['ROOT'])], handlers.DeleteHandler)

// Softdelete /payments/collections route
PaymentCollectionRoutes.delete('/payments/collections/soft/:id', [auth, role(['ROOT'])], handlers.SoftDeleteHandler)

// Get /payments/collections/getid route
PaymentCollectionRoutes.get('/payments/collections/getid', [auth, role(['ROOT', 'ADMINISTRATOR', 'DRIVER'])], handlers.GetPaymentCollectionID)

// Post /payments/authorize
PaymentCollectionRoutes.post('/payments/authorize', [auth, role(['ROOT'])], handlers.CreatePaymentHandler)


module.exports = PaymentCollectionRoutes