// requirements
var mongoose = require('mongoose');
var connectionURL = process.env.MONGODB_URLMONGODB_URL;

//connection
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});