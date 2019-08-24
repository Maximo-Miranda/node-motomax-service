const express = require('express')
const handlers = require('./handlers')
const UserRoutes = express()

// Login ...
UserRoutes.post('/login', (r, w) => {

    let body = r.body

    w.json(body)

})

// Get users route
UserRoutes.get('/users', handlers.IndexHandler)

// Create user route
UserRoutes.post('/users', handlers.StoreHandler)

// Update user route
UserRoutes.put('/users/:id', handlers.UpdateHandler)

// Delete user route
UserRoutes.delete('/users/:id', handlers.DeleteHandler)

// Softdelete user route
UserRoutes.delete('/users/soft/:id', handlers.SoftDeleteHandler)

module.exports = UserRoutes