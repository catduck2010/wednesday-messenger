'use strict';

const mainController = require('../controllers/main-controller');

module.exports = app => {
    app.route('/uuid')
        .get(mainController.uuid);
    app.route('/register')
        .post(mainController.register);
    app.route('/login')
        .post(mainController.verify);
    app.route('/user/:username')
        .get();
    app.route('/user/id/:userId')
        .get().put().delete();
};
