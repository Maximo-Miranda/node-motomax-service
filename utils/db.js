// Requires
const mongoose = require('mongoose')

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err) => {

    if (err) throw err

    console.log('Database ONLINE')

});