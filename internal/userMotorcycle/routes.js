// node_module requires
const express = require('express')
const userMotorcycleRoutes = express()

// Internal requieres
const handlers = require('./handlers')
const auth = require('../middlewares/auth')
const role = require('../middlewares/permisson')

// Get /usersmotorcycles route
userMotorcycleRoutes.get('/usersmotorcycles', [auth, role(['ROOT'])], handlers.IndexHandler)

// Get /usermotorcycle route
userMotorcycleRoutes.get('/usermotorcycle/:id', [auth, role(['ROOT'])], handlers.GetByIDHandler)

// Create /usersmotorcycles route
userMotorcycleRoutes.post('/usersmotorcycles', [auth, role(['ROOT'])], handlers.StoreHandler)

// Update /usersmotorcycles/:id route
userMotorcycleRoutes.put('/usersmotorcycles/:id', [auth, role(['ROOT'])], handlers.UpdateHandler)

// Delete /usersmotorcycles/:id route
userMotorcycleRoutes.delete('/usersmotorcycles/:id', [auth, role(['ROOT'])], handlers.DeleteHandler)

// Softdelete /usersmotorcycles route
userMotorcycleRoutes.delete('/usersmotorcycles/soft/:id', [auth, role(['ROOT'])], handlers.SoftDeleteHandler)


module.exports = userMotorcycleRoutes