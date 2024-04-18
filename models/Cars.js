const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    consumption: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car
