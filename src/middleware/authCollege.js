const jwt = require('jsonwebtoken');
const College = require('../models/College');

const auth = async (req, res, next) => {
    console.log('body',req.body);
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const college = await College.findOne({_id: decoded._id, 'tokens.token': token});
        if(!college) {
            throw new Error();
        }
        req.token = token;
        req.college = college;
        next();
    } catch (error) {
        res.status(401).send({error: 'Not authenticated to perform the operation'});
    }
}

module.exports = auth;