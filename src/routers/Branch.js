const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');
const authAdmin = require('../middleware/authAdmin');
const authCollege = require('../middleware/authCollege');
const Has = require('../models/Has');

router.post('/add/branch', authAdmin, async (req, res) => {
    req.body.circuit=req.body.circuit==='true';
    try{
        const branch = new Branch(req.body);
        await branch.save();
        const data = JSON.stringify({
            redirectURL: '/'
        });
        res.render('redirect', {
            successMessage: `successfully added ${branch.name}`,
            data
        });
    } catch(e) {
        console.log(e);
        const data = JSON.stringify({
            redirectURL: '/add/branch?q=admin'
        });
        res.render('redirect', {
            failMessage: `unable to add`,
            data
        });
    }
});

router.post('/branches/college/data',authCollege, async (req, res) => {
    try{
        const allBranches = await Branch.find({});
        const currBranches = await Has.find({college: req.college._id});
        let curr = [];
        let final = [];
        currBranches.forEach(element => {
            curr.push(String(element.branch));
        });
        allBranches.forEach(element => {
            if(curr.indexOf(String(element._id))===-1) final.push(element);
        });
        res.send(final);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/branches', async (req, res) => {
    try {
        const branches = await Branch.find({});
        res.status(200).render('viewBranches', {
            data: JSON.stringify(branches)
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/branch/id_name', async (req, res) => {
    try{
        const branches = await Branch.find({}).select({'_id':1, 'name': 1});
        res.status(200).send(branches);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


module.exports = router;    