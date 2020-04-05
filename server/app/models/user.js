'use strict';
const mongoose = require('mongoose');
const common = require('../services/common-service');
const Schema = mongoose.Schema;


let userSchema = new Schema(
    {
        userId: {type: String, immutable: true, index: true, default: common.uuid()},
        username: {
            type: String,
            required: [true, 'Username is needed!'],
            index: true,
            unique: [true, 'Username exists!']
        },
        password: {type: String, required: [true, 'Password is needed!']},
        friendList: [String] // userId
    }
);

module.exports = mongoose.model('User', userSchema);
