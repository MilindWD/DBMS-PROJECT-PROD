const express = require('express');
const College = require('../models/College');
const router = new express.Router();
const authCollege = require('../middleware/authCollege');
const authAdmin = require('../middleware/authAdmin');
const Has = require('../models/Has');
const Question = require('../models/Question');
const Visits = require('../models/Visits');
const bcrypt = require('bcryptjs');

router.get('/add/college', (req, res) => {
    res.render('addCollege');
});

router.post('/add/college', authAdmin, async (req, res) => {
    const college = new College(req.body);
    let data = {
        redirectURL: '/'
    }
    data = JSON.stringify(data);
    try{
        await college.save();
        res.render('redirect', {
            successMessage: 'college registered',
            data,
        });
    } catch(error) {
        console.log(error);
        res.render('redirect', {
            failMessage: 'Invalid data',
            data,
        });
    }
});

router.get('/colleges', async (req, res) => {
    try {
        let colleges = await College.find({}).select({
            '_id': 1,
            'name': 1,
            'location': 1,
            'cetcode': 1,
            'contact': 1
        }).sort({'name':1});
        colleges = JSON.stringify(colleges);
        res.status(200).render('viewColleges', {data: colleges});
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/login/college', (req, res) => {
    res.render('collegeLogin');
});

router.post('/login/college', async (req, res) => {
    try{
        const college = await College.findByCredentials(req.body.username, req.body.password);
        const token = await college.generateAuthToken();
        const data = JSON.stringify({
            redirectURL: '/',
            redirectPage: 'home page',
            localSave: {
                profile: 'college',
                name: college.name,
                token
            }
        });
        res.status(200).render('redirect',  {
            successMessage: `successfully logged in as ${college.name}`,
            redirectPage: 'home page',
            data
        });
    } catch(error) {
        console.log(error);
        res.status(500).render('redirect', {
            failMessage: `Unable to login`,
            redirectPage: 'login page',
            data: JSON.stringify({
                redirectURL: '/login?q=college'
            })
        });
    }
});

router.post('/college/profile', authCollege, (req, res) => {
    try{
        res.send({
            name: req.college.name
        })
    } catch(error) {
        console.log(error);
        res.send('error');
    }
});

router.get('/college/id_name', async (req, res) => {
    const colleges = await College.find({}).select({'_id':1, 'name': 1}).sort({'name': 1});
    res.send(colleges);
});

router.post('/logout/college', authCollege, async (req,res) => {
    try {
        req.college.tokens = [];
        await req.college.save();
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/remove/college', authCollege, async (req, res) => {
    try {
        const id = req.college._id;
        await College.findByIdAndDelete(id);
        await Has.deleteMany({college: id});
        await Question.deleteMany({college: id});
        await Visits.deleteMany({college: id});
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/update/college', authCollege, async (req,res) => {
    if(req.query.q==='submit') {
        console.log(req.body.password);
        if(req.body.password==='') req.body.password=req.college.password;
        else req.body.password = await bcrypt.hash(req.body.password, 8);
        try {
            await College.findOneAndUpdate({_id: req.college._id},req.body);
            const data = JSON.stringify({
                redirectURL: '/',
                redirectPage: 'home page',
                localSave: {
                    profile: 'college',
                    name: req.body.name,
                    token: req.body.token
                }
            });
            res.status(200).render('redirect',  {
                successMessage: `successfully updated`,
                redirectPage: 'home page',
                data
            });
        } catch (error) {
            console.log(error);
            res.status(200).render('redirect',  {
                failMessage: `could not update`,
                redirectPage: 'home page',
                data
            });
        }
    } else {
        try {
            req.college.password = undefined;
            req.college.tokens = undefined;
            res.render('update', {
                data: JSON.stringify(req.college)
            });
        } catch (error) {
            console.log(error);
            res.status(200).render('redirect',  {
                failMessage: `could not find page`,
                redirectPage: 'home page',
                data
            });
        }
    }
    
    
    
});


module.exports = router;