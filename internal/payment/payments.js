// node_modules requires
const mongoose = require("mongoose");
const moment = require("moment");

// Internal requieres
const cons = require("../../utils/constants");

let Schema = mongoose.Schema;

let paymentsSchema = new Schema({

    title: {
        type: String,
        required: [true, "The title is required"]
    },
    payment_status:{
        type: String,
        default: cons.pymentStatus.values[0],
        enum: cons.pymentStatus
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

module.exports = mongoose.model("payments", paymentsSchema);