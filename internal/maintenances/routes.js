// node_module requires
const express = require('express')
const maintenancesRoutes = express()

// Internal requieres
const handlers = require('./handlers')
const auth = require('../middlewares/auth')
const role = require('../middlewares/permisson')

// Get /usersmotorcycles route
maintenancesRoutes.get('/maintenances', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.IndexHandler)

// Get /usermotorcycle route
maintenancesRoutes.get('/maintenance/:id', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.GetByIDHandler)

// Create /usersmotorcycles route
maintenancesRoutes.post('/maintenances', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.StoreHandler)

// Update /usersmotorcycles/:id route
maintenancesRoutes.put('/maintenances/:id', [auth, role(['ROOT'])], handlers.UpdateHandler)

// Delete /usersmotorcycles/:id route
maintenancesRoutes.delete('/maintenances/:id', [auth, role(['ROOT'])], handlers.DeleteHandler)

// Softdelete /usersmotorcycles route
maintenancesRoutes.delete('/maintenances/soft/:id', [auth, role(['ROOT'])], handlers.SoftDeleteHandler)


module.exports = maintenancesRoutes