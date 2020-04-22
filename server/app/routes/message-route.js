'use strict';

const chatController = require('../controllers/chat-controller');

module.exports = app => {
    // support post only
    app.route('/messages')
        .post(chatController.newMessage);
    // support post put & delete methods
    app.route('/messages/:messageId')
        .post(chatController.getMessage)
        .put(chatController.editMessage)
        .delete(chatController.deleteMessage);
};
