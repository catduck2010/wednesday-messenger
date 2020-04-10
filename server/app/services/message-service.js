'use strict';
const mongoose = require('mongoose'),
    Message = mongoose.model('Message');

exports.create = params => {
    return new Message(params).save();
};

exports.search = params => {
    return Message.find(params).exec();
};

exports.delete = messageId => {
    return Message.findOneAndDelete({messageId: messageId}).exec();
};

exports.get = messageId => {
    return Message.findOne({messageId: messageId}).exec();
};

exports.update = updatedItem => {
    return Message.findOneAndUpdate({messageId: updatedItem.messageId}, updatedItem);
};

