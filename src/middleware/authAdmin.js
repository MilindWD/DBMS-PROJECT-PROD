const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    console.log('enter');
    try {
        const token = req.body.token;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({_id: decoded._id, 'tokens.token': token});
        if(!admin) {
            throw new Error();
        }
        req.token = token;
        req.admin = admin;
        console.log(admin);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).render('redirect', {
            message: `Unauthorized`,
            redirectPage: 'home page',
            data: JSON.stringify({
                redirectURL: '/'
            })
        });
    }
}

module.exports = auth;