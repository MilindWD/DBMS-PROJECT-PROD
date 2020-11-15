const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const visitsSchema = mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    numberOfSelected: {
        type: Number,
        required: true
    },
    averagePackage: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const Visits = mongoose.model('Visits', visitsSchema);

module.exports = Visits;