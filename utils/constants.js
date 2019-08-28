const typeIdentifications = {
    values: [
        "CEDULA",
        "PASSPORT",
        "EMAIL"
    ],
    message: '{VALUE} not is a valid identification'
}


const roles = {
    values: [
        "ROOT",
        "ADMINISTRATOR",
        "DRIVER"
    ],
    message: '{VALUE} not is a valid role'
}

const status = {
    values: [
        "ACTIVE",
        "INACTIVO",
        "MAINTENANCE",
        "OPERATING",
        "DELETED"
    ],
    message: '{VALUE} not is a valid status'
}

const typePaymentCollection = {
    values: [
        "PAYMENT",
        "DEBT",
        "ADVENCEMENT"
    ],
    message: '{VALUE} not is a valid type of payment collection'
}


module.exports = {
    typeIdentifications,
    roles,
    status,
    typePaymentCollection,
}