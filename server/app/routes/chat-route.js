'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    app.route('/message')
        .post(chatController.newMessage);
    app.route('/message/:messageId')
        .put()
        .delete();
    app.route('/chat')
        .post(chatController.newChat);
    app.route('/chat/:chatId')
        .put()
        .delete();
};
