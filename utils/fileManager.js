// node_mdules requires
const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4')

// UploadFile ...
async function UploadFile(pathUrl, file, validExtensions) {

    try {

        let pathStorage = []

        if (!fs.existsSync(pathUrl)) {
            fs.mkdirSync(pathUrl)
        }

        if (Number(file.size) > 1000000) {
            throw new Error(`The size of ${file.name} exceeds limit (1 MB)`)
        }

        let extension = file.name.split('.')

        if (validExtensions.indexOf(extension[1]) < 0) {
            throw new Error(`The extension of ${file.name} is invalid`)
        }

        let filename = `${extension[0]}_${uuidv4()}.${extension[1]}`

        let realPath = pathUrl + '/' + filename

        await file.mv(realPath)
        pathStorage.push(realPath)

        return pathStorage

    } catch (err) {
        throw err
    }

}

// DeleteFile ...
async function DeleteFile(pathUrl) {

    try {

        console.log(pathUrl)

        if (fs.existsSync(pathUrl)) {

            fs.unlinkSync(pathUrl)
        }

    } catch (err) {
        throw err
    }

}

module.exports = {
    UploadFile,
    DeleteFile
}