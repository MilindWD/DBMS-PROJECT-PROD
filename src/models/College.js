const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


 var collegeSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true 
        },
        location: {
            type: String,
            required: true
        },
        cetcode: {
            type: String,
            minlength: 4,
            maxlength: 4,
            unique: true,
            required: true,
            uppercase: true
        },
        contact: {
            type: Number,
            minlength: 10,
            maxlength: 12,
            required: true                   
        },
        password: {
            type: String,
            required: true
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
}); 

collegeSchema.pre('save', async function (next) {
    const college = this;
    if(college.isModified('password')) {
        college.password = await bcrypt.hash(college.password, 8);
    }
    next();
});

collegeSchema.statics.findByCredentials = async (cetcode, password) => {
    const college = await College.findOne({cetcode});
    if(!college) {
        throw new Error('Unable to Log-in');
    }
    const isMatch = await bcrypt.compare(password, college.password);
    if(!isMatch) {
        throw new Error('Unable to Log-in');
    }
    return college;
}


collegeSchema.methods.generateAuthToken = async function () {
    const college = this;
    const token = jwt.sign({_id: college._id.toString() }, process.env.JWT_SECRET);
    college.tokens = college.tokens.concat({token});
    await college.save();
    return token;
}

var College = mongoose.model("College",collegeSchema);

module.exports = College;

