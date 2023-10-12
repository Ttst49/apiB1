const mongoose = require('mongoose')

const SpiceSchema = new mongoose.Schema({


    name:{
        type: mongoose.SchemaTypes.String
    },
    price: {
        type : mongoose.SchemaTypes.Number
    },
    description:{
        type : mongoose.SchemaTypes.String
    }

})

module.exports = mongoose.model('spices', SpiceSchema)