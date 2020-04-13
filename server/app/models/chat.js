'use strict';
require('./user');

const mongoose = require('mongoose');
const common = require('../helper/common');
const Schema = mongoose.Schema;

let chatSchema = new Schema({
    _id: {type: String, default: common.uuid()},
    // chatId: {type: String, default: common.uuid(), index: true, immutable: true},
    chatName: {type: String, default: 'Chat'},
    users: [{type: String, ref: 'User'}] // userId
});

module.exports = mongoose.model('Chat', chatSchema);
