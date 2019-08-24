// Requires
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/motomax', { useNewUrlParser: true, useCreateIndex: true }, (err) => {

    if (err) throw err

    console.log('Database ONLINE')

});