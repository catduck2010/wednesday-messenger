'use strict';
const mongoose = require('mongoose');
const common = require('../helper/common');
const Schema = mongoose.Schema;

let chatSchema = Schema({
    chatId: {type: String, default: common.uuid(), index: true, immutable: true},
    chatName: {type: String, default: 'Chat'},
    users: [String] // userId
});

module.exports = mongoose.model('Chat', chatSchema);
