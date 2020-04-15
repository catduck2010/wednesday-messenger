'use strict';
require('../models/index');
const userMap = require('../helper/usermap');
const chatService = require('../services/chat-service'),
    userService = require('../services/user-service');
/*
 * separate socket.io actions
 */
const controller = (io) => {
    io.on('connection', (socket) => {
        // on connection
        const userId = socket.handshake.query.user;
        const promise = userService.get(userId);
        promise
            .then((doc) => {
                if (doc === null || doc === undefined) {
                    throw new Error('No such user');
                }
                userMap.put(userId, socket.id, doc.sessionId);
                if (io.sockets.connected[socket.id]) {
                    io.sockets.connected[socket.id].emit('success', `User-${userId} is connected.`);
                }
            })
            .catch((error) => {
                if (io.sockets.connected[socket.id]) {
                    io.sockets.connected[socket.id].emit('error_message', error.message);
                }
            });

        // on connect/disconnect
        // socket.on('login', (userId, sessionId) => {
        //     userMap.put(userId, socket.id, sessionId);
        // });

        // on disconnect
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
                                io.sockets.connected[socketId].emit('new message', chatId, messageId);
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

module.exports = controller;
