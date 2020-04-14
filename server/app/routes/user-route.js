'use strict';

const userCtrl = require('../controllers/user-controller');

module.exports = app => {
    app.route('/uuid')
        .get(userCtrl.uuid);
    app.route('/register')
        .post(userCtrl.register);
    app.route('/login')
        .post(userCtrl.verify);
    app.route('/user/:username')
        .get(userCtrl.getByUsername);
    app.route('/user/id/:userId')
        .get(userCtrl.getById)
        .put(userCtrl.updateById)
        .delete(userCtrl.deleteById);
};
