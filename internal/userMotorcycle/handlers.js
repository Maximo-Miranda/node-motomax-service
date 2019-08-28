// node_modules requires
const _ = require('underscore')

// Internal requieres
const Model = require('./userMotorcycle')
const cons = require('../../utils/constants')

// IndexHandler ...
function IndexHandler(r, w) {

    //TODO: Add console logs

    let from = r.query.from || 0
    from = Number(from)

    let limit = r.query.limit || 5
    limit = Number(limit)

    let filter = {
        status: cons.status.values[0]
    }

    Model.find(filter)
        .skip(from)
        .limit(limit)
        .exec((err, usersMotorcycles) => {

            if (err) {
                return w.status(500).json({
                    error: true,
                    data: null,
                    message: err
                })
            }

            Model.countDocuments(filter, (err, quantity) => {

                if (err) {
                    return w.status(500).json({
                        error: true,
                        data: null,
                        message: err
                    })
                }

                return w.status(200).json({
                    error: false,
                    data: {
                        total: quantity,
                        users_motorcycles: usersMotorcycles
                    },
                    message: 'Get users motorcycles successfull'
                })
            })

        })
}

// StoreHandler ...
function StoreHandler(r, w) {

    let req = r.body

    console.log('LOG internal/userMotorcycle/handlers@StoreHandler', req);

    let userMotorcycle = new Model({
        motorcycle: req.motorcycle_id,
        user: req.user_id,
        start_date: req.start_date,
        end_date: req.end_date,
    })

    userMotorcycle.save((err, userMotorcycleDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        return w.status(200).json({
            error: false,
            data: userMotorcycleDB,
            message: 'User Motorcycle created successfull'
        })
    })
}

// GetByIDHandler ...
async function GetByIDHandler(r, w) {

    try {

        const id = r.params.id

        let userMotorcycleDB = await Model.findById(id).populate('user').populate('motorcycle')

        if (!userMotorcycleDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'User motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: userMotorcycleDB,
            message: 'Get user motorcycle  successfull'
        })

    } catch (err) {
        return w.status(500).json({
            error: true,
            data: null,
            message: err
        })
    }

}

// UpdateHandler ...
function UpdateHandler(r, w) {

    let req = _.pick(r.body, ['motorcycle_id', 'user_id', 'start_date', 'end_date', 'status'])

    let id = r.params.id

    console.log('LOG internal/userMotorcycle/handlers@UpdateHandler', req, id);

    Model.findByIdAndUpdate(id, req, { new: true, runValidators: true }, (err, userMotorcycleDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!userMotorcycleDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'User motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: userMotorcycleDB,
            message: 'User motorcycle updated successfull'
        })

    })

}

// DeleteHandler ...
function DeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    Model.findByIdAndRemove(id, (err, userMotorcycleDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!userMotorcycleDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'User motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: userMotorcycleDB,
            message: 'User motorcycle updated successfull'
        })

    })

}

// SoftDeleteHandler ...
function SoftDeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    console.log('LOG internal/userMotorcycle/handlers@SoftDeleteHandler', id);

    Model.findByIdAndUpdate(id, { status: cons.status.values[4] }, { new: true }, (err, userMotorcycleDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!userMotorcycleDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'User motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: userMotorcycleDB,
            message: 'User motorcycle (soft) deleted successfull'
        })

    })

}

module.exports = {
    StoreHandler,
    IndexHandler,
    UpdateHandler,
    DeleteHandler,
    SoftDeleteHandler,
    GetByIDHandler,
}