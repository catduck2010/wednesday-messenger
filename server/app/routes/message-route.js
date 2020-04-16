'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    app.route('/messages')
        .post(chatController.newMessage);
    app.route('/messages/:messageId')
        .post(chatController.getMessage)
        .put(chatController.editMessage)
        .delete(chatController.deleteMessage);
};
