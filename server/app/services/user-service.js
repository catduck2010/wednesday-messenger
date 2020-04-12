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
    return User.findOne({userId: userId}).exec();
};

exports.newSession = (username, sessionId) => {
    return User.updateOne({username: username}, {
        sessionId: sessionId
    }).exec();
};

exports.delete = userId => {
    User.findOneAndDelete({userId: userId}).exec();
};

exports.update = updatedItem => {
    User.findOneAndUpdate({userId: updatedItem.userId}, updatedItem).exec();
};
