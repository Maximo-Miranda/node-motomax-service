// node_modules requires
const mongoose = require("mongoose");
const moment = require("moment");

// Internal requieres
const cons = require("../../utils/constants");

let Schema = mongoose.Schema;

let motorcycleSchema = new Schema({
    brand: {
        type: String,
        required: [true, "The brand is required"]
    },
    model: {
        type: Number,
        required: [true, "The model is required"]
    },
    color: {
        type: String,
        required: [true, "The color is required"]
    },
    license_plate: {
        type: String,
        unique: true,
        required: [true, "The license plate is required"]
    },
    price: {
        type: Number,
        required: [true, "The price is required"]
    },
    date_of_purchase: {
        type: String,
        required: [true, "The date of purchase is required"]
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

module.exports = mongoose.model("motorcycles", motorcycleSchema);