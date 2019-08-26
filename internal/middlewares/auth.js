// node_module requires
const jwt = require('jsonwebtoken')

// Validate JWT
function ValidateToken(r, w, next) {

    let token = r.get('Authorization')

    if (!token) {

        return w.status(400).json({
            error: true,
            data: null,
            message: 'Authorization header is required'
        })

    }

    token = token.split(' ')
    if (token[0] != 'Bearer') {

        return w.status(400).json({
            error: true,
            data: null,
            message: 'Bearer is required in JWT'
        })

    }

    jwt.verify(token[1], process.env.APP_SECRET_KEY, (err, decoded) => {

        if (err) {
            return w.status(401).json({
                error: true,
                data: null,
                message: err
            })
        }

        r.claims = decoded

        next()
    })


}

module.exports = ValidateToken