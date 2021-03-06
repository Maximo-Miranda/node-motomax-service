// node_modules requires
const _ = require('underscore')

// Internal requieres
const Model = require('./motorcycles')
const pcModel = require('../paymentCollection/paymentCollection')
const mnModel = require('../maintenances/maintenance')
const cons = require('../../utils/constants')

// IndexHandler ...
function IndexHandler(r, w) {

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
        .exec((err, motorcycles) => {

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
                        motorcycles
                    },
                    message: 'Get motorcycles successfull'
                })
            })

        })

}

// StoreHandler ...
function StoreHandler(r, w) {

    let req = r.body

    let motorcycle = new Model({
        brand: req.brand,
        model: req.model,
        color: req.color,
        license_plate: String(req.license_plate).toUpperCase(),
        price: req.price,
        date_of_purchase: req.date_of_purchase,
        url_photo: req.url_photo,
    })

    console.log('LOG internal/motorcycles/handlers@StoreHandler', req);

    motorcycle.save((err, motorcycleDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        return w.status(200).json({
            error: false,
            data: motorcycleDB,
            message: 'Motorcycle created successfull'
        })
    })
}

// GetByIDHandler ...
async function GetByIDHandler(r, w) {

    try {

        const id = r.params.id

        let motorcycleDB = await Model.findById(id)

        let paymentCollections = await pcModel.find({"motorcycle": id}).populate(["user"])

        let maintenances = await mnModel.find({"motorcycle": id})

        if (!motorcycleDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'User not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: {
                motorcycleDB,
                payments_collections: paymentCollections,
                maintenances,
            },
            message: 'Get motorcycle successfull'
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

    let req = _.pick(r.body, ['brand', 'model', 'color', 'license_plate', 'price', 'date_of_purchase', 'status', 'url_photo'])

    if(req.license_plate) {
        req.license_plate = String(req.license_plate).toUpperCase()
    }

    let id = r.params.id

    console.log('LOG internal/motorcycles/handlers@UpdateHandler', req, id);

    Model.findByIdAndUpdate(id, req, { new: true, runValidators: true }, (err, motorcycleDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!motorcycleDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: motorcycleDB,
            message: 'Motorcycle updated successfull'
        })

    })

}

// DeleteHandler ...
function DeleteHandler(r, w) {

    let id = r.params.id

    Model.findByIdAndRemove(id, (err, motorcycleDeletesDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!motorcycleDeletesDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: motorcycleDeletesDB,
            message: 'Motorcycle deleted successfull'
        })

    })

}

// SoftDeleteHandler ...
function SoftDeleteHandler(r, w) {

    let id = r.params.id

    console.log('LOG internal/motorcycles/handlers@SoftDeleteHandler', id);

    Model.findByIdAndUpdate(id, { status: cons.status.values[4] }, { new: true }, (err, motorcycleDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!motorcycleDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: motorcycleDB,
            message: 'Motorcycle (soft) deleted successfull'
        })

    })

}

// ValidateUniqueIdentificationHandler ...
async function ValidateUniqueLicensePlateHandler(r, w) {

    try {

        const req = r.body

        let motorcycleDB = await Model.findOne({ license_plate: String(req.license_plate).toUpperCase() })

        if (!motorcycleDB) {
            return w.status(200).json({
                error: false,
                data: null,
                message: 'Motorcycle not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: motorcycleDB,
            message: 'Motorcycle found'
        })

    } catch (err) {
        return w.status(500).json({
            error: true,
            data: null,
            message: err
        })
    }

}

module.exports = {
    StoreHandler,
    IndexHandler,
    UpdateHandler,
    DeleteHandler,
    SoftDeleteHandler,
    GetByIDHandler,
    ValidateUniqueLicensePlateHandler,
}