'use strict';
const mongoose = require('mongoose');
const common = require('../services/common-service');
const Schema = mongoose.Schema;

let messageSchema = Schema(
    {
        userId: {type: String, required: true},
        chatId: {type: String, required: true},
        messageId: {type: String, default: common.uuid(), index: true},
        type: {type: String, default: 'text'},
        content: String,
        time: {type: Date, default: Date.now()}
    }
);

module.exports = mongoose.model('Message', messageSchema);
