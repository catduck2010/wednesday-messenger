'use strict';

const userCtrl = require('../controllers/user-controller');

module.exports = app => {
    app.route('/uuid')
        .get(userCtrl.uuid);
    app.route('/users')
        .post(userCtrl.register);
    app.route('/users/login')
        .post(userCtrl.verify);
    app.route('/users/:username')
        .get(userCtrl.getByUsername);
    app.route('/users/id/:userId')
        .get(userCtrl.getById)
        .put(userCtrl.updateById)
        .delete(userCtrl.deleteById);
    app.route('/users/id/:userId/chats')
        .get(userCtrl.getAllChatsInfo);
    app.route('/users/id/:userId/friends')
        .get(userCtrl.getAllFriendsInfo);
};
