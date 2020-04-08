const express = require("express"),
    app = express(),
    port = process.env.PORT || 7777,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/messenger', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, ' +
        'Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, ' +
        'X-Access-Token, XKey, Authorization');
    next();
});

const initApp = require('./app/app');
initApp(app);

app.listen(port);
console.log('Server started on port ' + port + '.');
