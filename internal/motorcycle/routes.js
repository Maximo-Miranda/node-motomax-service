// node_module requires
const express = require('express')
const MotorcycleRoutes = express()

// Internal requieres
const handlers = require('./handlers')
const auth = require('../middlewares/auth')
const role = require('../middlewares/permisson')

// Get motorcycles route
MotorcycleRoutes.get('/motorcycles', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.IndexHandler)

// Get motorcycle route
MotorcycleRoutes.get('/motorcycle/:id', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.GetByIDHandler)

// Create motorcycle route
MotorcycleRoutes.post('/motorcycles', [auth, role(['ROOT'])], handlers.StoreHandler)

// Update motorcycle route
MotorcycleRoutes.put('/motorcycles/:id', [auth, role(['ROOT'])], handlers.UpdateHandler)

// Delete motorcycle route
MotorcycleRoutes.delete('/motorcycles/:id', [auth, role(['ROOT'])], handlers.DeleteHandler)

// Softdelete motorcycle route
MotorcycleRoutes.delete('/motorcycles/soft/:id', [auth, role(['ROOT'])], handlers.SoftDeleteHandler)


module.exports = MotorcycleRoutes