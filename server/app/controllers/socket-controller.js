'use strict';
require('../models/chat');
const userMap = require('../helper/usermap');
const chatService = require('../services/chat-service');

module.exports = (io) => {
    io.on('connection', (socket) => {
        if (io.sockets.connected[socket.id]) {
            io.sockets.connected[socket.id].emit('message', 'connected');
        }
        // on connect/disconnect
        socket.on('login', (userId, sessionId) => {
            userMap.put(userId, socket.id, sessionId);
        });
        socket.on('disconnect', () => {
            userMap.remove(socket.id);
        });
        // when someone send a uploaded message
        socket.on('message', (userId, sessionId, chatId, messageId) => {
            // sessionId is okay
            if (userMap.session(sessionId) === userId) {
                let users = [];
                const promise = chatService.get(chatId);
                promise.then((doc) => {
                    if (doc === undefined || doc === null) {
                        throw new Error('Null Chat!')
                    }
                    doc.users.forEach((user) => {
                        users.push('' + user);
                    });

                    users.forEach((user) => {
                        if (user !== userId) {
                            let socketId;
                            [socketId,] = userMap.get(user);
                            if (io.sockets.connected[socketId]) {
                                io.sockets.connected[socketId].emit('chat-' + chatId, messageId);
                            }
                        }
                    });
                }).catch((error) => {
                    socket.emit('error', error.message);
                });
            } else {
                socket.emit('logout', 'You have logged out!');
            }
        });
    });
};
