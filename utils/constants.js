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

module.exports = {
    typeIdentifications,
    roles,
    status,
}