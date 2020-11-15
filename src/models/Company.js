const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tier: {
        type: Number,
        minValue: 1,
        maxValue: 4
    }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
