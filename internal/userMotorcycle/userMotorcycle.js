// node_modules requires
const mongoose = require("mongoose");
const moment = require("moment");

// Internal requieres
const cons = require("../../utils/constants");

let Schema = mongoose.Schema;

let userMotorcycleSchema = new Schema({

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
    start_date: {
        type: String,
        required: [true, "The start date is required"]
    },
    end_date: {
        type: String,
        required: [true, "The start date is required"]
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

module.exports = mongoose.model("users_motorcycles", userMotorcycleSchema);