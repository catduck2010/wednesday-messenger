'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    app.route('/message')
        .post(chatController.newMessage);
    app.route('/message/:messageId')
        .post(chatController.getMessage)
        .put(chatController.editMessage)
        .delete(chatController.deleteMessage);
};
