// node_module requires
const express = require('express')
const UserRoutes = express()

// Internal requieres
const handlers = require('./handlers')
const auth = require('../middlewares/auth')
const role = require('../middlewares/permisson')

// Login route
UserRoutes.post('/login', handlers.LoginHandler)

// Login Google
UserRoutes.post('/login/google', handlers.LoginGoogleHandler)

// Get users route
UserRoutes.get('/users', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.IndexHandler)

// Get user route
UserRoutes.get('/user/:id', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.GetByIDHandler)

// Create user route
UserRoutes.post('/users', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.StoreHandler)

// Update user route
UserRoutes.put('/users/:id', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.UpdateHandler)

// Delete user route
UserRoutes.delete('/users/:id', [auth, role(['ROOT'])], handlers.DeleteHandler)

// Softdelete user route
UserRoutes.delete('/users/soft/:id', [auth, role(['ROOT'])], handlers.SoftDeleteHandler)

// Validate identification user route
UserRoutes.post('/users/validate/identification', [auth, role(['ROOT'])], handlers.ValidateUniqueIdentificationHandler)

module.exports = UserRoutes