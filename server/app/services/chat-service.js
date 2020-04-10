'use strict';
const mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

exports.create = (params) => {
    return new Chat(params).save();
};

exports.search = (params) => {
    return Chat.find(params).exec();
};

exports.update = (updatedItem) => {
    return Chat.updateOne({chatId: updatedItem.chatId}, updatedItem).exec();
};

exports.get = chatId => {
    return Chat.findOne({chatId: chatId}).exec();
};

exports.delete = chatId => {
    return Chat.findOneAndDelete({chatId: chatId}).exec();
};


