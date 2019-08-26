// Check if user has permisson
function ValidateRole(role) {

    return function(r, w, next) {

        let result = role.find(rol => rol == r.claims.role)

        if (!result) {
            return w.status(401).json({
                error: true,
                data: null,
                message: 'Unauthorized'
            })
        }

        next()
    }

}

module.exports = ValidateRole