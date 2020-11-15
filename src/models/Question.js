const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    round: {
        type: String
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;