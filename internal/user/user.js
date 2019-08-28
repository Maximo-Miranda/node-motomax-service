const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const cons = require('../../utils/constants')

let Schema = mongoose.Schema

let userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'The name is required']
    },
    lastname: {
        type: String,
        required: [true, 'The lastname is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    role: {
        type: String,
        default: cons.roles[2],
        enum: cons.roles
    },
    img: {
        type: String,
    },
    nacionality: {
        type: String,
        required: [true, 'The nacionality is required'],
    },
    identification: {
        type: String,
        unique: true,
        required: [true, 'The identification is required'],
    },
    type_identification: {
        type: String,
        required: [true, 'The type identification is required'],
        enum: cons.typeIdentifications
    },
    phonenumber: {
        type: String,
        required: [true, 'The phonenumber is required']
    },
    google: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: cons.status.values[0],
        enum: cons.status,
    }

})

userSchema.methods.toJSON = function() {

    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject

}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

module.exports = mongoose.model('users', userSchema)