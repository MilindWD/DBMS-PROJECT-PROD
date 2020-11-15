const express = require('express');
const router = express.Router();
const authAdminCollege = require('../middleware/authAdminCollege');
const Question = require('../models/Question');
const Branch = require('../models/Branch');
const College = require('../models/College');
const Company = require('../models/Company');

router.post('/add/question', authAdminCollege, async (req, res) => {
    let i=0;
    let redData = {
        redirectURL: '/'
    }
    redData = JSON.stringify(redData);
    while(req.body[`round${i}`]) {
        const data = {
            branch: req.body.branch,
            college: req.college._id,
            company: req.body.company,
            round: req.body[`round${i}`],
            topic: req.body[`topic${i}`],
            description: req.body[`description${i++}`]
        }
        try {
            const question = new Question(data);
            await question.save();
        } catch (error) {
            console.log(error);
            res.render('redirect', {
                failMessage: 'could not save',
                data: redData,
            });return;
        }
    }
    res.render('redirect', {
        successMessage: 'Question saved',
        data: redData,
    });
});

router.get('/questions', async (req, res) => {
    let filter = {};
    let query = `Question.find(filter)`;
    let college, branch, company;
    let names = {};
    if(req.query.college) {
        filter['college'] = req.query.college;
        college = await College.find({_id: req.query.college}).select({'name':1});
    }
    else query+=`.populate('college')`;
    if(req.query.branch) {
        filter['branch'] = req.query.branch;
        branch = await Branch.find({_id: req.query.branch}).select({'name': 1});
    }
    else query+=`.populate('branch')`;
    if(req.query.company) {
        filter['company'] = req.query.company;
        company = await Company.find({_id: req.query.company});
    }
    else query+=`.populate('company')`;
    const questions = await eval(query);
    const data = JSON.stringify(questions);
    res.render('viewQuestions',{
        college: college?college[0].name:undefined,
        branch: branch?branch[0].name:undefined,
        company: company?company[0].name:undefined,
        data
    });
});

module.exports = router;