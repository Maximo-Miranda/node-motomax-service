// node_modules requires
const _ = require('underscore')

// Internal requieres
const Model = require('./maintenance')
const cons = require('../../utils/constants')
const fileManager = require('../../utils/fileManager')

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
        .exec((err, maintenances) => {

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
                        maintenances
                    },
                    message: 'Get maintenances successfull'
                })
            })

        })
}

// GetByIDHandler ...
async function GetByIDHandler(r, w) {

    try {

        const id = r.params.id

        let maintenanceDB = await Model.findById(id).populate('user').populate('motorcycle')

        if (!maintenanceDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Maintenance not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: maintenanceDB,
            message: 'Get maintenance successfull'
        })

    } catch (err) {
        return w.status(500).json({
            error: true,
            data: null,
            message: err.message
        })
    }

}

// StoreHandler ...
async function StoreHandler(r, w) {

    try {

        let req = r.body

        console.log('LOG internal/maintenances/handlers@StoreHandler', req);

        let maintenance = new Model({
            motorcycle: req.motorcycle_id,
            user: req.user_id,
            value: req.value,
            description: req.description,
            type_maintenance: req.type_maintenance,
        })

        if (r.files) {

            const pathUrl = `storage/maintenance`

            let uploadResult = await fileManager.UploadFile(pathUrl, r.files.photos, ['png', 'jpg', 'gif', 'jpeg'])

            maintenance.photos = uploadResult

        }

        let maintenanceDB = await maintenance.save()

        return w.status(200).json({
            error: false,
            data: maintenanceDB,
            message: 'Maintenance created successfull'
        })

    } catch (err) {
        return w.status(500).json({
            error: true,
            data: null,
            message: err.message
        })
    }
}

// UpdateHandler ...
async function UpdateHandler(r, w) {

    try {

        let req = _.pick(r.body, ['motorcycle', 'user', 'value', 'description', 'type_maintenance', 'status'])

        let id = r.params.id

        console.log('LOG internal/maintenances/handlers@UpdateHandler', req, id);

        if (r.files) {

            const pathUrl = `storage/maintenance`

            let uploadResult = await fileManager.UploadFile(pathUrl, r.files.photos, ['png', 'jpg', 'gif', 'jpeg'])

            req.photos = uploadResult

        }

        let maintenanceDB = await Model.findByIdAndUpdate(id, req, { new: true, runValidators: true })

        if (!maintenanceDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Maintenance not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: maintenanceDB,
            message: 'Maintenance updated successfull'
        })

    } catch (err) {
        return w.status(500).json({
            error: true,
            data: null,
            message: err.message
        })
    }

}

// DeleteHandler ...
function DeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    Model.findByIdAndRemove(id, async(err, maintenanceDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!maintenanceDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Maintenance not found'
            })
        }

        for (let photo of maintenanceDB.photos) {
            await fileManager.DeleteFile(photo)
        }

        return w.status(200).json({
            error: false,
            data: maintenanceDB,
            message: 'Maintenance deleted successfull'
        })

    })

}

// SoftDeleteHandler ...
function SoftDeleteHandler(r, w) {

    let id = r.params.id

    //TODO: Add console logs

    console.log('LOG internal/maintenance/handlers@SoftDeleteHandler', id);

    Model.findByIdAndUpdate(id, { status: cons.status.values[4] }, { new: true }, (err, maintenanceDB) => {

        if (err) {
            return w.status(500).json({
                error: true,
                data: null,
                message: err
            })
        }

        if (!maintenanceDB) {
            return w.status(404).json({
                error: true,
                data: null,
                message: 'Maintenance not found'
            })
        }

        return w.status(200).json({
            error: false,
            data: maintenanceDB,
            message: 'Maintenance (soft) deleted successfull'
        })

    })

}

module.exports = {
    StoreHandler,
    IndexHandler,
    GetByIDHandler,
    UpdateHandler,
    DeleteHandler,
    SoftDeleteHandler,
}