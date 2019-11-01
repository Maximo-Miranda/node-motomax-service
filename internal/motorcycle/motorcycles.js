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
        type: String,
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
    url_photo:{
        type: String,
        default: 'storage/no-image'
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD")
    }
});

module.exports = mongoose.model("motorcycles", motorcycleSchema);