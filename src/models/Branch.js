const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    circuit: {
        type: Boolean,
        required: true
    }
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
