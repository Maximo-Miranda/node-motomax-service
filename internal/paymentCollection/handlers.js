// node_modules requires
const _ = require('underscore')
const uuidv4 = require('uuid/v4');

// Internal requieres
const Model = require('./paymentCollection')
const paymentModel = require('../payment/payments')
const cons = require('../../utils/constants')

const moment = require("moment");


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
        .exec((err, paymentCollections) => {

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
                        payment_collections: paymentCollections
                    },
                    message: 'Get payment collections successfull'
                })
            })

        })
}

// QueryHandler
function QueryHandler(r, w) {

    //TODO: Add console logs

    let from = r.query.from || 0
    from = Number(from)

    let limit = r.query.limit || 5
    limit = Number(limit)

    let req = r.body

    let filter = {
        status: cons.status.values[0],
        date: {
            $gte: moment(req.date_from).format("YYYY-MM-DD"),
            $lt: moment(req.date_end).format("YYYY-MM-DD")
        }
    }

    Model.find(filter)
        .skip(from)
        .limit(limit)
        .exec((err, paymentCollections) => {

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
                        payment_collections: paymentCollections
                    },
                    message: 'Get payment collections successfull'
                })
            })

        })
}

// StoreHandler ...
function StoreHandler(r, w) {

    let req = r.body

    //TODO: Add console logs

    let motorcycle = new Model({
        motorcycle: req.motorcycle_id,
        payment: req.payment_id,
        user: r.claims._id,
        observation: req.observation,
        value: req.value,
        type_payment_collection: req.type_payment_collection,
    })

    console.log('LOG internal/motorcycles/handlers@StoreHandler', req);

    motorcycle.save((err, paymentCollectionDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentCollectionDB,
            message: 'Payment collection created successfull'
        })
    })
}

// GetByIDHandler ...
async function GetByIDHandler(r, w) {

    try {

        const id = r.params.id

        let paymentCollectionDB = await Model.findById(id)

        if (!paymentCollectionDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment collection not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentCollectionDB,
            message: 'Get payment collection successfull'
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

    let req = _.pick(r.body, ['motorcycle_id', 'user_id', 'observation', 'value', 'type_payment_collection', 'status'])

    let id = r.params.id

    console.log('LOG internal/paymentCollection/handlers@UpdateHandler', req, id);

    Model.findByIdAndUpdate(id, req, { new: true, runValidators: true }, (err, paymentCollectionDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!paymentCollectionDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment collection not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentCollectionDB,
            message: 'Payment collection updated successfull'
        })

    })

}

// DeleteHandler ...
function DeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    Model.findByIdAndRemove(id, (err, paymentCollectionDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!paymentCollectionDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment collection not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentCollectionDB,
            message: 'Payment collection deleted successfull'
        })

    })

}

// SoftDeleteHandler ...
function SoftDeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    console.log('LOG internal/paymentCollection/handlers@SoftDeleteHandler', id);

    Model.findByIdAndUpdate(id, { status: cons.status.values[4] }, { new: true }, (err, paymentCollectionDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!paymentCollectionDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Payment collection not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: paymentCollectionDB,
            message: 'Payment collection (soft) deleted successfull'
        })

    })

}

// GetPaymentCollectionID ...
function GetPaymentCollectionID(r, w) {

    return w.status(200).json({
        error: false,
        data: {
            id: uuidv4()
        },
        message: 'Payment collection ID generated successfull'
    })
}

// CreatePaymentHandler ...
async function CreatePaymentHandler(r, w) {

    try {

        const req = r.body

        const payment = new paymentModel({
            payment_collection: req.payment_collection_id,
            value: req.value,
            motorcycle: req.motorcycle_id
        })

        let paymentDB = await payment.save()

        return w.json({
            error: false,
            data: paymentDB,
            message: 'Payment created successfull'
        })

    } catch (err) {
        return w.json({
            error: true,
            data: null,
            message: err.message
        })
    }

}

module.exports = {
    StoreHandler,
    IndexHandler,
    UpdateHandler,
    DeleteHandler,
    SoftDeleteHandler,
    GetPaymentCollectionID,
    GetByIDHandler,
    CreatePaymentHandler,
    QueryHandler,
}