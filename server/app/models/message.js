'use strict';
const mongoose = require('mongoose');
const common = require('../services/common-service');
const Schema = mongoose.Schema;

let messageSchema = Schema(
    {
        messageId: {type: String, default: common.uuid()},
        type: {type: String, default: 'text'},
        content: String
    }
);

module.exports = mongoose.model('Message', messageSchema);
