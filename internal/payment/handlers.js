// node_modules requires
const _ = require('underscore')

// Internal requieres
const Model = require('./payments')
const pcModel = require('../paymentCollection/paymentCollection')
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
        .exec((err, payments) => {

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
                        payments
                    },
                    message: 'Get payments successfull'
                })
            })

        })
}

// StoreHandler ...
function StoreHandler(r, w) {

    let req = r.body

    //TODO: Add console logs

    let motorcycle = new Model({
        title: req.title,
        status: req.status,
    })

    motorcycle.save((err, paymentDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentDB,
            message: 'Payment created successfull'
        })
    })
}

// GetByIDHandler ...
async function GetByIDHandler(r, w) {

    try {

        const { id } = r.params

        let paymentDB = await Model.findById(id)

        let paymentCollections = await pcModel.find({"payment": id}).populate(["user", "motorcycle"])

        if (!paymentDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: {
                paymentDB,
                payments_collections: paymentCollections
            },
            message: 'Get payment successfull'
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

    let req = _.pick(r.body, ['title', 'payment_status'])

    let id = r.params.id

    console.log('LOG internal/payments/handlers@UpdateHandler', req, id);

    Model.findByIdAndUpdate(id, req, { new: true, runValidators: true }, (err, paymentDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!paymentDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentDB,
            message: 'Payment updated successfull'
        })

    })

}

// DeleteHandler ...
function DeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    Model.findByIdAndRemove(id, (err, paymentDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!paymentDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentDB,
            message: 'Payment deleted successfull'
        })

    })

}

// SoftDeleteHandler ...
function SoftDeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    console.log('LOG internal/payments/handlers@SoftDeleteHandler', id);

    Model.findByIdAndUpdate(id, { status: cons.status.values[4] }, { new: true }, (err, paymentDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!paymentDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentDB,
            message: 'Payment (soft) deleted successfull'
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