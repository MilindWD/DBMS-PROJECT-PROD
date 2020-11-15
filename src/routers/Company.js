const express = require('express');
const Company = require('../models/Company');
const authAdminCollege = require('../middleware/authAdminCollege');
const Has = require('../models/Has');

const router = express.Router();


router.get('/choose/company', async (req, res) => {
    try {
        const companies = await Company.find({}).sort({name: 1});
        if(req.query.q!=='admin'&&req.query.q!=='college') res.send('404');
        else {
            res.status(200).render('addCompany', {
                authType: req.query.q,
                data: JSON.stringify(companies)
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/choose/company', authAdminCollege, async (req, res) => {
    let company = req.body.company;
    if(company==='other') {
        const companyData = {
            name: req.body.name,
            tier: req.body.tier
        }
        try {
            company = new Company(companyData);
            await company.save();
        } catch (error) {
            console.log(error);
            res.send(error);
        }
        company = company._id;
    }
    try {
        const branches = await Has.find({college: req.college._id}).populate('branch');
        const data = JSON.stringify({
            college:  req.college._id,
            company: company,
            branches
        })
        res.status(200).render('addQuestion',{
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find({}).select({
            '_id': 1,
            'name': 1,
            'tier': 1
        });
        res.status(200).render('viewCompanies', {
            data: JSON.stringify(companies)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/company/id_name', async (req, res) => {
    try {
        const companies = await Company.find({}).select({'_id':1, 'name': 1});
        res.status(200).send(companies);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;