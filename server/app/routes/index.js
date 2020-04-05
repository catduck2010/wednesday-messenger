'use strict';

const userRoute = require('../routes/user-route');

module.exports = app => {
    userRoute(app);
};
