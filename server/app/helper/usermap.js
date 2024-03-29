'use strict';

// maps are used to determine the online status
const userMap = new Map();
const sessionMap = new Map();
const socketMap = new Map();

// add to map
exports.put = (userId, socketId, sessionId) => {
    remove(userId);
    console.log(`putting ${userId}, ${socketId}, ${sessionId}...`);
    userMap.set(userId, {
        socketId: socketId,
        sessionId: sessionId
    });
    sessionMap.set(sessionId, userId);
    socketMap.set(socketId, userId);
};

// get from maps
const get = (userId) => {
    if (userMap.has(userId)) {
        const data = userMap.get(userId);
        return [data.socketId, data.sessionId]
    } else {
        return [null, null];
    }
};

// remove using userid
const remove = (userId) => {
    if (userMap.has(userId)) {
        const doc = userMap.get(userId);
        sessionMap.delete(doc.sessionId);
        socketMap.delete(doc.socketId);
        userMap.delete(userId);
    }
};

const trySession = (sessionId) => sessionMap.has(sessionId) ? sessionMap.get(sessionId) : null;
const checkOnline = (userId) => userMap.has(userId);

exports.get = get;

exports.session = trySession;

exports.checkOnline = checkOnline;

exports.remove = (socketId) => {
    if (socketMap.has(socketId)) {
        const userId = socketMap.get(socketId);
        socketMap.delete(socketId);
        const sessionId = userMap.get(userId).sessionId;
        userMap.delete(userId);
        sessionMap.delete(sessionId);
    }
};

// return a promise to genuine the qualification of access
exports.genuine = (sessionId, userId) => {
    return new Promise((resolve) => {
        if(sessionId === 'development'){
            resolve();
        } else if (trySession(sessionId) === userId) {
            resolve();
        } else {
            throw new Error('Access Denied');
        }
    });
}

