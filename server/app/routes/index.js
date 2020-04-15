'use strict';

const userRoute = require('./user-route'),
    chatRoute = require('./chat-route'),
    messageRoute = require('./message-route');

module.exports = app => {
    userRoute(app);
    chatRoute(app);
    messageRoute(app);
};
