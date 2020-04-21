'use strict';

//define objects
const chatService = require('../services/chat-service'),
    messageService = require('../services/message-service'),
    userService = require('../services/user-service'),
    userMap = require('../helper/usermap'),
    common = require('../helper/common'),
    renderErrorResponse = common.renderErrorResponse;

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under default path
exports.newMessage = (req, res) => {
    //Grab id and text parameter
    const sessionId = req.body.sessionId;
    //if (sessionCheck(sessionId, req, res, 403)) {
    const item = Object.assign({}, req.body);
    item._id = common.uuid();
    const trySession = userMap.genuine(sessionId, item.userId);
    const promise = chatService.get(item.chatId);
    //throw error
    trySession
        .then(() => promise)
        .then((doc) => {
            if (doc === null || doc === undefined) {
                console.log(doc);
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

// Take the chat parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under default path
exports.newChat = (req, res) => {
    //Grab id and chat parameter
    const sessionId = req.body.sessionId, userId = req.body.userId;
    //if (sessionCheck(sessionId, req, res, 403)) {
    const item = Object.assign({}, req.body);
    item._id = common.uuid();
    const trySession = userMap.genuine(sessionId, userId);
    const promise = chatService.create(item);
    let doc = null;
    //throw error
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

// Take the chat information parameter and insert it into the
// Realtime Database under default path
exports.getChatInfo = (req, res) => {
    const chatId = req.params.chatId;
    const promise = chatService.get(chatId);
    promise
        .then((doc) => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// Take the chat message parameter and insert it into the
// Realtime Database under default path
exports.getChatMessage = (req, res) => { // post
    //grab id info parameter
    const chatId = req.params.chatId, sessionId = req.body.sessionId, userId = req.body.userId;
    const trySession = userMap.genuine(sessionId, userId);
    const promise = messageService.search({chatId: chatId});
    //throw error
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

// Take the changes by editChat parameter and insert it into the
// Realtime Database under default path
exports.editChat = (req, res) => {
    //grab id info parameters
    const chatId = req.params.chatId, sessionId = req.body.sessionId, userId = req.body.userId;
    const trySession = userMap.genuine(sessionId, userId);
    const item = Object.assign({}, req.body);
    item._id = chatId;
    const promise = chatService.update(item);
    //throw error
    trySession
        .then(() => promise)
        .then((doc) => chatService.get(doc._id))
        .then((doc) => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// Take the changes by deleteChat parameter and insert it into the
// Realtime Database under default path
exports.deleteChat = (req, res) => {
    const chatId = req.params.chatId, sessionId = req.body.sessionId, userId = req.body.userId;
    const trySession = userMap.genuine(sessionId, userId);
    //throw error
    trySession
        .then(() => chatService.delete(chatId))
        .then((doc) => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// Take the message parameter and insert it into the
// Realtime Database under default path
exports.getMessage = (req, res) => { // post
    //grab id info parameter
    const messageId = req.params.messageId, sessionId = req.body.sessionId, userId = req.body.userId;
    const trySession = userMap.genuine(sessionId, userId);
    //throw error
    trySession
        .then(() => messageService.get(messageId))
        .then((doc) => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// Take the changes by editMessage parameter and insert it into the
// Realtime Database under default path
exports.editMessage = (req, res) => {
    //grab id info parameter
    const messageId = req.params.messageId, sessionId = req.body.sessionId, userId = req.body.userId;
    const item = Object.assign({}, req.body);
    item.messageId = messageId;
    const promise = messageService.update(item);
    const trySession = userMap.genuine(sessionId, userId);
    //throw error
    trySession
        .then(() => {
            return promise;
        })
        .then((doc) => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));

};

// Take the changes by deleteMessage parameter and insert it into the
// Realtime Database under default path
exports.deleteMessage = (req, res) => {
    //grab id info parameter
    const messageId = req.params.messageId, sessionId = req.body.sessionId, userId = req.body.userId;
    const trySession = userMap.genuine(sessionId, userId);
    //throw error
    trySession
        .then(() => messageService.delete(messageId))
        .then((doc) => {
            res.status(201);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};
