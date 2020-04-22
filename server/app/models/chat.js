'use strict';
require('./user');

const mongoose = require('mongoose');
const common = require('../helper/common');
const Schema = mongoose.Schema;

let chatSchema = new Schema({
    _id: {type: String, default: common.uuid()},
    chatName: {type: String, default: 'Chat'},
    users: [{type: String, ref: 'User'}] // userId
});

chatSchema.virtual('id').get(() => this._id.toString());
chatSchema.set('toJSON', {
    virutals: true
})

module.exports = mongoose.model('Chat', chatSchema);
