// node_modules requires
const mongoose = require("mongoose");
const moment = require("moment");

// Internal requieres
const cons = require("../../utils/constants");

let Schema = mongoose.Schema;

let maintenanceSchema = new Schema({

    motorcycle: { // the type objectID create relation with ref (motorcycle)
        type: Schema.Types.ObjectId,
        ref: 'motorcycles',
        required: [true, "The motorcycle id is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "The user id is required"]
    },
    value: {
        type: Number,
        required: [true, "The value is required"]
    },
    description: {
        type: String,
        required: [true, "The description is required"]
    },
    type_maintenance: {
        type: String,
        required: [true, "The type of maintenance is required"],
        enum: cons.typeMaintenances
    },
    photos: {
        type: [String]
    },
    url_photo:{
        type: String,
        default: 'storage/no-image'
    },
    status: {
        type: String,
        default: cons.status.values[0],
        enum: cons.status
    },
    date: {
        type: String,
        default: moment().format("L")
    }

});

module.exports = mongoose.model("maintenances", maintenanceSchema);