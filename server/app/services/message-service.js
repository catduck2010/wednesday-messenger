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
    return Message.findByIdAndDelete(messageId).exec();
};

exports.get = messageId => {
    return Message.findById(messageId).exec();
};

exports.update = updatedItem => {
    return Message.findByIdAndUpdate(updatedItem._id, updatedItem);
};

