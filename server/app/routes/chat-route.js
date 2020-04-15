'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    app.route('/chat')
        .post(chatController.newChat);
    app.route('/chat/:chatId')
        .post(chatController.getChatMessage)
        .put(chatController.editChat)
        .delete(chatController.deleteChat);
};
