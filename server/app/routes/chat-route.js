'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    // support post method
    app.route('/chats')
        .post(chatController.newChat);
    // supports get post put & delete methods
    app.route('/chats/:chatId')
        .get(chatController.getChatInfo)
        .post(chatController.getChatMessage)
        .put(chatController.editChat)
        .delete(chatController.deleteChat);
};
