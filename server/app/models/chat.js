'use strict';
const mongoose = require('mongoose');
const common = require('../services/common-service');
const Schema = mongoose.Schema;

let chatSchema = Schema(
    {
        chatId: {type: String, default: common.uuid(), index: true},
        users: [String],
        messages: Array
    }
);

module.exports = mongoose.model('Chat', chatSchema);
