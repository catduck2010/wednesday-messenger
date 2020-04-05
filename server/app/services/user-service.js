'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = params => {
    return new User(params).save();
};

exports.search = params => {
    return User.findOne({username: params.username}).exec();
};
