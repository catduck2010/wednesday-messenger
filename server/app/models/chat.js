'use strict';
const mongoose = require('mongoose');
const common = require('../services/common-service');
const messageModel = require('./message');
const Schema = mongoose.Schema;

let chatSchema = Schema(
    {
        chatId: {type: String, default: common.uuid()},
        revChatId: {type: String, default: common.uuid()},
        from: {type: String, required: [true, 'Sender is Needed!']},
        to: {type: String, required: [true, 'Receiver is Needed!']},
        messages: Array
    }
);

module.exports = mongoose.model('Chat', chatSchema);
