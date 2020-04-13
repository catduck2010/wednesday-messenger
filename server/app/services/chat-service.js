'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Chat = mongoose.model('Chat');

exports.create = (params) => {
    return new Chat(params).save();
};

exports.search = (params) => {
    return Chat.find(params).exec();
};

exports.update = (updatedItem) => {
    return Chat.findByIdAndUpdate(updatedItem._id, updatedItem).exec();
};

exports.get = chatId => {
    return Chat.findById(chatId).exec();
};

exports.delete = chatId => {
    return Chat.findByIdAndDelete(chatId).exec();
};

// exports.create2 = (params) => {
//     let session = null;
//     return mongoose.startSession()
//         .then(_session => {
//             session = _session;
//             session.startTransaction();
//             return new Chat(params).save({session: session});
//         })
//         .then(() => Chat.findOne(params).session(session))
//         .then(doc => {
//             const chatId = doc._id;
//             const users = doc.users;
//             return User.updateMany({_id: {$in: users}}, {$addToSet: {chatList: chatId}}, {session: session});
//         })
//         .then(() => session.commitTransaction());
// }


