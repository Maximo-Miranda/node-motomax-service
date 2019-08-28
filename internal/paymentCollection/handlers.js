// node_modules requires
const _ = require('underscore')
const uuidv4 = require('uuid/v4');

// Internal requieres
const Model = require('./paymentCollection')
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
        user: r.claims._id,
        observation: req.observation,
        value: req.value,
        type_payment_collection: req.type_payment_collection,
    })

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

        let paymentCollectionDB = await Model.findById(id).populate('motorcycle').populate('user')

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

function GetPaymentCollectionID(r, w) {

    return w.status(200).json({
        error: false,
        data: {
            id: uuidv4()
        },
        message: 'Payment collection ID generated successfull'
    })
}

module.exports = {
    StoreHandler,
    IndexHandler,
    UpdateHandler,
    DeleteHandler,
    SoftDeleteHandler,
    GetPaymentCollectionID,
    GetByIDHandler,
}