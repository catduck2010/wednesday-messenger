'use strict';

const userMap = new Map();
const sessionMap = new Map();
const ioMap = new Map();

exports.put = (userId, socketId, sessionId) => {
    console.log(`putting ${userId}, ${socketId}, ${sessionId}...`);
    userMap.set(userId, {
        socketId: socketId,
        sessionId: sessionId
    });
    sessionMap.set(sessionId, userId);
    ioMap.set(socketId, userId);
};

const get = (userId) => {
    if (userMap.has(userId)) {
        const data = userMap.get(userId);
        return [data.socketId, data.sessionId]
    } else {
        return [null, null];
    }
};

const trySession = (sessionId) => sessionMap.has(sessionId) ? sessionMap.get(sessionId) : null;
const checkOnline = (userId) => userMap.has(userId);

exports.get = get;

exports.session = trySession;

exports.checkOnline = checkOnline;

exports.remove = (socketId) => {
    if (ioMap.has(socketId)) {
        const userId = ioMap.get(socketId);
        ioMap.delete(socketId);
        const sessionId = userMap.get(userId).sessionId;
        userMap.delete(userId);
        sessionMap.delete(sessionId);
    }
};

exports.genuine = (sessionId, userId) => {
    return new Promise((resolve) => {
        if (trySession(sessionId) === null || sessionMap.get(userId) !== sessionId) {
            throw new Error('Access Denied');
        } else {
            resolve();
        }
    });
}

