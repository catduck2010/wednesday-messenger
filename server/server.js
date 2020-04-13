const app = require("express")(),
    port = process.env.PORT || 777,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    ioCtrl = require('./app/controllers/socket-controller'),
    io = require('socket.io').listen(server);
// docker pull mongo:4.2.5-bionic
// docker run --name mymongo -p 27017:27017 -v ~/.mongo/db:/data/db -d mongo:4.2.5-bionic
mongoose.connect('mongodb://localhost:27017/messenger', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    retryWrites: false
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
ioCtrl(io);

server.listen(port);
console.log('Server started on port ' + port + '.');
