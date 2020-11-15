const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});


adminSchema.pre('save', async function (next) {
    const admin = this;
    if(admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
});

adminSchema.statics.findByCredentials = async (username, password) => {
    const admin = await Admin.findOne({username});
    if(!admin) {
        throw new Error('Unable to Log-in');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch) {
        throw new Error('Unable to Log-in');
    }
    return admin;
}

adminSchema.methods.generateAuthToken = async function () {
    const admin = this;
    const token = jwt.sign({_id: admin._id.toString() }, process.env.JWT_SECRET);
    admin.tokens = admin.tokens.concat({token});
    await admin.save();
    return token;
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;