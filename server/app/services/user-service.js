'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = params => {
    return new User(params).save();
};

exports.search = username => {
    return User.findOne({username: username}).exec();
};

