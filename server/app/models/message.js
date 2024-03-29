'use strict';
require('./user');
require('./chat');
const mongoose = require('mongoose');
const common = require('../helper/common');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    _id: {type: String, default: common.uuid()},
    userId: {type: String, required: true, ref: 'User'},
    chatId: {type: String, required: true, index: true, ref: 'Chat'},
    // messageId: {type: String, default: common.uuid(), index: true, immutable: true},
    type: {type: String, default: 'text'}, // only support text so far
    content: String,
    time: {type: Date, default: Date.now()}
});

messageSchema.virtual('id').get(() => this._id.toString());
messageSchema.set('toJSON', {
    virutals: true
})

module.exports = mongoose.model('Message', messageSchema);
