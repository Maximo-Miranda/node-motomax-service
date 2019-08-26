// node_modules requires
const Model = require('./users')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const jwt = require('jsonwebtoken')

// Internal requieres
const cons = require('../../utils/constants')


// IndexHandler ...
function IndexHandler(r, w) {

    let from = r.query.from || 0
    from = Number(from)

    let limit = r.query.limit || 5
    limit = Number(limit)

    // For get all you can use '' (empty string), or not send this param
    let fields = 'name lastname role img nacionality identification type_identification phonenumber'

    let filter = {
        status: cons.status.values[0]
    }

    Model.find(filter, fields)
        .skip(from)
        .limit(limit)
        .exec((err, users) => {

            if (err) {
                return w.status(500).json({
                    error: true,
                    data: null,
                    message: err
                })
            }

            Model.countDocuments(filter, (err, quantity) => {
                return w.status(200).json({
                    error: false,
                    data: {
                        total: quantity,
                        users
                    },
                    message: 'Get users successfull'
                })
            })

        })

}

// StoreHandler ...
function StoreHandler(r, w) {

    let req = r.body

    let user = new Model({
        name: req.name,
        lastname: req.lastname,
        password: bcrypt.hashSync(req.password, 10),
        role: req.role,
        img: req.img,
        nacionality: req.nacionality,
        identification: req.identification,
        type_identification: req.type_identification,
        phonenumber: req.phonenumber
    })

    user.save((err, userDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        return w.status(200).json({
            error: false,
            data: userDB,
            message: 'User created successfull'
        })
    })
}

// UpdateHandler ...
function UpdateHandler(r, w) {

    let req = _.pick(r.body, ['name', 'lastname', 'role', 'img', 'nacionality', 'identification', 'type_identification', 'phonenumber', 'status'])

    let id = r.params.id

    console.log('LOG internal/users/handlers@UpdateHandler', req, id);

    Model.findByIdAndUpdate(id, req, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        return w.status(200).json({
            error: false,
            data: userDB,
            message: 'User updated successfull'
        })

    })

}

// DeleteHandler ...
function DeleteHandler(r, w) {

    let id = r.params.id

    Model.findByIdAndRemove(id, (err, userDeletesDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!userDeletesDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'User not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: userDeletesDB,
            message: 'User deleted successfull'
        })

    })

}

// SoftDeleteHandler ...
function SoftDeleteHandler(r, w) {

    let id = r.params.id

    console.log('LOG internal/users/handlers@SoftDeleteHandler', id);

    Model.findByIdAndUpdate(id, { status: cons.status.values[4] }, { new: true }, (err, userDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        return w.status(200).json({
            error: false,
            data: userDB,
            message: 'User (soft) deleted successfull'
        })

    })

}

// LoginHandler ...
function LoginHandler(r, w) {

    let req = r.body

    Model.findOne({ identification: req.identification }, (err, userDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!userDB) {
            return w.status(400).json({
                error: true,
                data: null,
                message: 'Invalid identification or password'
            })
        }

        if (!bcrypt.compareSync(req.password, userDB.password)) {
            return w.status(400).json({
                error: true,
                data: null,
                message: 'Invalid identification or password'
            })
        }

        let claims = _.pick(userDB, ['_id', 'name', 'lastname', 'img', 'nacionality', 'identification', 'role'])

        let token = jwt.sign(claims, process.env.APP_SECRET_KEY, { expiresIn: process.env.JWT_EXDATE });

        return w.status(200).json({
            error: false,
            data: {
                user: claims,
                token,
            },
            message: 'Login successfull'
        })

    })

}

module.exports = {
    StoreHandler,
    UpdateHandler,
    IndexHandler,
    DeleteHandler,
    SoftDeleteHandler,
    LoginHandler,
}