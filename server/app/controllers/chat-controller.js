'use strict';

const chatService = require('../services/chat-service'),
    messageService = require('../services/message-service'),
    userService = require('../services/user-service'),
    userMap = require('../helper/usermap'),
    common = require('../helper/common'),
    renderErrorResponse = common.renderErrorResponse;

let sessionCheck = (sessionId, req, res, statusCode) => {
    if (userMap.session(sessionId) === null) {
        res.status(statusCode);
        res.json({
            message: 'Access Denied'
        });
        return false;
    }
    return true;
};

const sessionGenuine = (sessionId) => {
    return new Promise((resolve) => {
        if (userMap.session(sessionId) === null) {
            throw new Error('Access Denied');
        } else {
            resolve();
        }
    });
}

exports.newMessage = (req, res) => {
    const sessionId = req.body.sessionId;
    //if (sessionCheck(sessionId, req, res, 403)) {
    const item = Object.assign({}, res.body);
    item._id = common.uuid();
    const trySession = userMap.genuine(sessionId);
    const promise = chatService.get(item.chatId);
    trySession
        .then(() => promise)
        .then((doc) => {
            if (userMap.session(sessionId) === null) {
                throw new Error('Access Denied');
            }
            if (doc === null || doc === undefined) {
                throw new Error('Sending message to a null chat.');
            } else {
                return messageService.create(item);
            }
        })
        .then((savedItem) => {
            res.status(201);
            res.json(savedItem);
        })
        .catch(renderErrorResponse(res));
    // }
};

exports.newChat = (req, res) => {
    const sessionId = req.body.sessionId;
    //if (sessionCheck(sessionId, req, res, 403)) {
    const item = Object.assign({}, res.body);
    item._id = common.uuid();
    const trySession = userMap.genuine(sessionId);
    const promise = chatService.create(item);
    let doc = null;
    trySession
        .then(() => promise)
        .then((savedItem) => {
            doc = savedItem;
            return userService.addChat(doc.users, doc._id);
        })
        .then(() => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
    //}
};

exports.getAllMessage = (req, res) => { // post
    const chatId = req.params.chatId, sessionId = req.body.sessionId, userId = req.body.userId;
    const trySession = userMap.genuine(sessionId);
    const promise = messageService.search({chatId: chatId});
    trySession
        .then(() => chatService.get(chatId))
        .then((doc) => {
            if (doc === null || doc === undefined) {
                return new Error('Null chat.')
            } else if (doc.users.indexOf(userId) === -1) {
                return new Error('Cannot visit this chat.');
            } else {
                return promise;
            }
        })
        .then((doc) => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));

};

exports.editChat = (req, res) => {

};

exports.deleteChat = (req, res) => {

};

exports.getMessage = (req, res) => { // post

};

exports.editMessage = (req, res) => {
    const messageId = req.params.messageId, sessionId = req.body.sessionId, userId = req.body.userId;
    const trySession = userMap.genuine(sessionId);
    const promise = messageService.get()

};

exports.deleteMessage = (req, res) => {

};
