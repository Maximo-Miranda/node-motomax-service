// node_module requires
const express = require('express')
const UserRoutes = express()

// Internal requieres
const handlers = require('./handlers')
const auth = require('../middlewares/auth')
const role = require('../middlewares/permisson')

// Login route
UserRoutes.post('/login', handlers.LoginHandler)

// Get users route
UserRoutes.get('/users', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.IndexHandler)

// Create user route
UserRoutes.post('/users', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.StoreHandler)

// Update user route
UserRoutes.put('/users/:id', [auth, role(['ROOT', 'ADMINISTRATOR'])], handlers.UpdateHandler)

// Delete user route
UserRoutes.delete('/users/:id', [auth, role(['ROOT'])], handlers.DeleteHandler)

// Softdelete user route
UserRoutes.delete('/users/soft/:id', [auth, role(['ROOT'])], handlers.SoftDeleteHandler)

module.exports = UserRoutes