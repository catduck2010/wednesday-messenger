'use strict';

const userRoute = require('./user-route'), chatRoute = require('./chat-route');

module.exports = app => {
    userRoute(app);
    chatRoute(app);
};
