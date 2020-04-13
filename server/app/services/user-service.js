'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = params => {
    return new User(params).save();
};

exports.search = username => {
    return User.findOne({username: username}).exec();
};

exports.get = userId => {
    return User.findById(userId).exec();
};

exports.newSession = (username, sessionId) => {
    return User.updateOne({username: username}, {
        sessionId: sessionId
    }).exec();
};

exports.delete = userId => {
    return User.findByIdAndDelete(userId).exec();
};

exports.update = updatedItem => {
    return User.findByIdAndUpdate(updatedItem._id, updatedItem).exec();
};

exports.addChat = (users, chatId) => {
    return User.updateMany({_id: {$in: users}}, {$addToSet: {chatList: chatId}}).exec();
}

exports.removeChat = (users, chatId) => {
    return User.updateMany({_id: {$in: users}}, {$pull: {chatList: chatId}}).exec();
}

exports.addFriend = (userId, friendId) => {
    return User.findByIdAndUpdate(userId, {$addToSet: {friendList: friendId}}).exec();
}

exports.deleteFriend = (userId, friendId) => {
    return User.findByIdAndUpdate(userId, {$pull: {friendList: friendId}}).exec();
}

exports.blockFriend = (userId, friendId) => {
    return User.findByIdAndUpdate(userId, {$addToSet: {blockList: friendId}}).exec();
}

exports.unblockFriend = (userId, friendId) => {
    return User.findByIdAndUpdate(userId, {$pull: {blockList: friendId}}).exec();
}
