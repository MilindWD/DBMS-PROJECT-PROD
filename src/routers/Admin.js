const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const authAdmin = require('../middleware/authAdmin');

router.post('/login/admin', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.username, req.body.password);
        const token = await admin.generateAuthToken();
        const data = JSON.stringify({
            redirectURL: '/',
            localSave: {
                profile: 'admin',
                name: admin.username,
                token
            }
        });
        res.status(200).render('redirect',  {
            successMessage: `successfully logged in as ${admin.username}`,
            data
        });
    } catch (error) {
        res.status(500).render('redirect', {
            failMessage: `Unable to login`,
            redirectPage: 'login page',
            data: JSON.stringify({
                redirectURL: '/login?q=admin'
            })
        });
    }
});

router.post('/logout/admin', authAdmin, async (req, res) => {
    req.admin.tokens = [];
    await req.admin.save();
    res.status(200).send();
});

module.exports = router;