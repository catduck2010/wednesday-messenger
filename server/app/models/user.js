'use strict';
require('./chat');

const mongoose = require('mongoose');
const common = require('../helper/common');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    _id: {type: String, default: common.uuid()},
    // userId: {type: String, immutable: true, index: true, default: common.uuid()},
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
    friendList: [{type: String, ref: 'User'}], // userId
    blockList: [{type: String, ref: 'User'}],
    chatList: [{type: String, ref: 'Chat'}]
});

// userSchema.virtual('userId').get(function () {
//     return this._id.toString();
// });

userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', userSchema);
