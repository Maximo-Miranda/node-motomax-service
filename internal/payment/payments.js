// node_modules requires
const mongoose = require("mongoose");
const moment = require("moment");

// Internal requieres
const cons = require("../../utils/constants");

let Schema = mongoose.Schema;

let paymentsSchema = new Schema({

    payment_collection: {
        type: Schema.Types.ObjectId,
        ref: 'payments_collections',
        required: [true, "The payment collection id is required"]
    },
    value: {
        type: Number,
        required: [true, "The value is required"]
    },
    motorcycle: {
        type: Schema.Types.ObjectId,
        ref: 'motorcycles',
        required: [true, "The motorcycle id is required"]
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