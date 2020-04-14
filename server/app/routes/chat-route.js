'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    app.route('/message')
        .post(chatController.newMessage);
    app.route('/message/:messageId')
        .post(chatController.getMessage)
        .put(chatController.editMessage)
        .delete(chatController.deleteMessage);
    app.route('/chat')
        .post(chatController.newChat);
    app.route('/chat/:chatId')
        .post(chatController.getAllMessage)
        .put(chatController.editChat)
        .delete(chatController.deleteChat);
};
