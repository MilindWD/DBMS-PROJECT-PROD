//importing
const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('./db/mongoose');
//routers
const collegeRouter = require('./routers/College');
const branchRouter = require('./routers/Branch');
const adminRouter = require('./routers/Admin');
const hasRouter = require('./routers/Has');
const companyRouter = require('./routers/Company');
const questionRouter = require('./routers/Question');
const visitsRouter = require('./routers/Visits');
//express and port
const app = express();
const port = process.env.PORT||3000;

//middlewares
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


//paths for configs
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialDir = path.join(__dirname, '../templates/partials');

//Setup HandleBars engine and Views location
app.set('view engine','hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialDir);

//Setup static directory
app.use(express.static(publicDir));

//Routes
app.use(collegeRouter);
app.use(branchRouter);
app.use(adminRouter);
app.use(hasRouter);
app.use(companyRouter);
app.use(questionRouter);
app.use(visitsRouter);

app.get('/', (req, res) => {
    res.render('index', {
        loginInfo: '',
        data: ''
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/add/branch', (req, res) => {
    res.render('addBranch');
});

//admins
const Admin = require('./models/Admin');
const admin1 = new Admin({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
});

const adminSave = async () => {
    const adminData = await Admin.find({'username': process.env.ADMIN_USERNAME});
    if(adminData.length===0) {
        admin1.save();
    }
}

adminSave();






//listen
app.listen(port, ()=>{
    console.log('start on '+process.env.PORT);
});

