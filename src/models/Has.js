const mongoose = require("mongoose");

const hasSchema = new mongoose.Schema({
//collegeid, branchid, avg pkg, plcmt %
    college:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    placed: [{
        number: {
            type: Number
        },
        year: {
            type: Number
        }
    }],
    averagePackage:{
        type: Number,
        required:true
    }
});


const Has = mongoose.model("Has", hasSchema);

module.exports = Has;