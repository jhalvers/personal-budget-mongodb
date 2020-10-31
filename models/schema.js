const mongoose = require("mongoose")

const nameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    }
}, { collection: 'myBudget'})

module.exports = mongoose.model('names', nameSchema)