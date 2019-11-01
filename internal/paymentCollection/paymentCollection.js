// node_modules requires
const mongoose = require("mongoose");
const moment = require("moment");

// Internal requieres
const cons = require("../../utils/constants");

let Schema = mongoose.Schema;

let paymentsCollectionsSchema = new Schema({
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
    payment: {
      type: Schema.Types.ObjectId,
        ref: 'payments',
        required: [true, "The payment id is required"],
    },
    observation: {
        type: String,
        default: "N/A",
    },
    value: {
        type: Number,
        required: [true, "The value is required"]
    },
    type_payment_collection: {
        type: String,
        required: [true, "The type of payment collection is required"],
        enum: cons.typePaymentCollection
    },
    status: {
        type: String,
        default: cons.status.values[0],
        enum: cons.status
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD")
    }
});

module.exports = mongoose.model("payments_collections", paymentsCollectionsSchema);