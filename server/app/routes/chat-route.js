'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    app.route('/chats')
        .post(chatController.newChat);
    app.route('/chats/:chatId')
        .get(chatController.getChatInfo)
        .post(chatController.getChatMessage)
        .put(chatController.editChat)
        .delete(chatController.deleteChat);
};
