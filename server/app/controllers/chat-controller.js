'use strict';

const chatService = require('../services/chat-service'),
    messageService = require('../services/message-service'),
    userMap = require('../helper/usermap'),
    common = require('../helper/common'),
    renderErrorResponse = common.renderErrorResponse;

let sessionCheck = (sessionId, req, res, statusCode) => {
    if (userMap.session(sessionId) === null) {
        res.status(statusCode);
        res.json({
            message: 'Access Denied.'
        });
        return false;
    }
    return true;
};

exports.newMessage = (req, res) => {
    const sessionId = req.body.sessionId;
    if (sessionCheck(sessionId, req, res, 403)) {
        let item = Object.assign({}, res.body);
        const promise = messageService.create(item);
        promise.then((savedItem) => {
            res.status(201);
            res.json(savedItem);
        });
    }
};

exports.newChat = (req, res) => {
    const sessionId = req.body.sessionId;
    if (sessionCheck(sessionId, req, res, 403)) {
        let item = Object.assign({}, res.body);
        const promise = chatService.create(item);
        promise.then((savedItem) => {
            res.status(201);
            res.json(savedItem);
        });
    }
};

exports.getMessage = (req, res) => {
    if (sessionCheck(req.body.sessionId, req, res, 403)) {

    }
};
