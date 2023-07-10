const mongoose = require('mongoose')

const DiveSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength:[3, "Must be at least 3 characters"],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        minLength:[3, "Must be at least 3 characters"],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength:[3, "Must be at least 3 characters"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    diveLink: {
        type: String,
        required: [true, "Link is required"],
    },
    
}, { timestamps: true })

const Dive = mongoose.model('Dive', DiveSchema)

module.exports = Dive
