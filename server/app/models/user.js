'use strict';
const mongoose = require('mongoose');
const common = require('../helper/common');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    userId: {type: String, immutable: true, index: true, default: common.uuid()},
    username: {
        type: String,
        required: [true, 'Username is needed!'],
        index: true,
        unique: [true, 'Username exists!'],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z]([-._a-zA-Z0-9]{5,19})$/.test(v);
            },
            message: () => 'format not valid!'
        },
    },
    nickname: {type: String, default: 'Dio Brando'},
    sessionId: String,
    password: {type: String, required: [true, 'Password is needed!']},
    friendList: [String], // userId
    chatList: [String]
});

module.exports = mongoose.model('User', userSchema);
