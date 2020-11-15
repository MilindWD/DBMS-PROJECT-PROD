// requirements
var mongoose = require('mongoose');
var connectionURL = process.env.MONGODB_URL;

//connection
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});