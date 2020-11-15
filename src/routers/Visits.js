const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Visits = require('../models/Visits');
const authCollege = require('../middleware/authCollege');
const Has = require('../models/Has');

router.get('/visits', async (req, res) => {
    const companies = await Company.find({}).select({'_id': 1, 'name':1});
    res.render('addVisits', {
        data: JSON.stringify(companies)
    });
});

router.post('/add/visits', authCollege, async (req,res) => {
    let redData = {
        redirectURL: '/'
    }
    redData = JSON.stringify(redData);
    try {
        if(req.body.company==='other') {
            const tempComp =  new Company({name: req.body.name, tier: req.body.tier});
            await tempComp.save();
            req.body.company = tempComp._id;
        }
        let i=0;
        while(i<100) {
            i++;
            if(!req.body[`branch${i}`]) continue;
            if(req.body[`numberOfSelected${i}`]) {
                const data = {
                    college: req.college._id,
                    company: req.body.company,
                    branch: req.body[`branch${i}`],
                    numberOfSelected: req.body[`numberOfSelected${i}`],
                    averagePackage: req.body.averagePackage,
                    year: req.body.year
                }
                const visit = new Visits(data);
                await visit.save();
                let has = await Has.find({college: req.college._id, branch: req.body[`branch${i}`]});
                has = has[0];
                let totalPlaced = 0;
                let yearFound=false;
                has.placed.forEach(element => {
                    totalPlaced+=parseInt(element.number);
                    if(String(element.year)===String(req.body.year)) {
                        yearFound=true;
                        element.number += parseInt(req.body[`numberOfSelected${i}`]);
                    }
                }); 
                if(!yearFound) {
                    has.placed.push({
                        number: req.body[`numberOfSelected${i}`],
                        year: req.body.year
                    });
                }
                has.averagePackage = ((parseInt(has.averagePackage)*totalPlaced)+(parseInt(req.body.averagePackage)*parseInt(req.body[`numberOfSelected${i}`]))) / (totalPlaced+parseInt(req.body[`numberOfSelected${i}`]));

                await has.save();
            }
        }
        res.render('redirect', {
            successMessage: `sucessfully added visit stats`,
            data: redData
        });
    } catch (error) {
        console.log(error);
        res.render('redirect', {
            successMessage: `Updating failed`,
            data: redData
        });
    }
});


module.exports = router;