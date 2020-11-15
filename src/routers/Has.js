const express = require('express');
const router = express.Router();
const Has = require('../models/Has');
const College = require('../models/College');
const authCollege = require('../middleware/authCollege');
const mongoose = require('mongoose');

router.post('/add/has', authCollege, async (req, res) => {
    const hasData = {
        college: req.college._id,
        branch: req.body.branch,
        averagePackage: 0
    }
    const branch = new Has(hasData);
    const data = JSON.stringify({
        redirectURL: '/add/branch?q=college'
    });
    try{
        await branch.save();
        res.render('redirect', {
            successMessage: 'branch registered',
            data,
        });
    } catch(error) {
        console.log(error);
        res.render('redirect', {
            failMessage: 'Unable to add',
            data,
        });
    }
});

router.get('/college/details/:q', async (req, res) => {
    const cetcode = req.params.q;
    try{
        const college = await College.find({cetcode: cetcode});
        const collegeBranches = await Has.find({college: college[0]._id}).populate('branch');
        res.render('collegeDetails', {
            name: college[0].name,
            location: college[0].location,
            data: JSON.stringify({
                collegeBranches,
                college: college[0]._id,
            })
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/add/branch', async (req,res) => {
    res.render('addBranch')
});

router.post('/college/branches/details',authCollege, async (req, res) => {
    try {
        const branches = await Has.find({college: req.college._id}).populate('branch').select({'branch': 1});
        res.status(200).send({branches});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;