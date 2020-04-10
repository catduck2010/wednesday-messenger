'use strict';
const userService = require('../services/user-service'),
    common = require('../helper/common'),
    renderErrorResponse = require('../helper/common').renderErrorResponse;


exports.test = (req, res) => {
    res.send('');
};

exports.uuid = (req, res) => {
    res.status(201);
    res.json({
        uuid: common.uuid()
    });
};

exports.register = (request, response) => {
    let user = Object.assign({}, request.body);
    const promise = userService.search(user.username);
    promise
        .then((u) => {
            if (!u) {
                console.log('Username not used!');
                return userService.create(user);
            } else {
                throw new Error(`User exists!`);
            }
        })
        .then(newUser => {
            response.status(201);
            response.json(newUser);
        })
        .catch(renderErrorResponse(response));
};

exports.verify = (request, response) => {
    const sessionId = common.uuid();
    const username = request.body.username, password = request.body.password;
    const promise = userService.search(username);
    promise
        .then(user => {
            if (common.password(password) === user.password) {
                return userService.newSession(user.username, sessionId);
            } else {
                throw new Error('Incorrect username or password.');
            }
        })
        .then(() => {
            response.status(200);
            response.json({
                message: 'Logged in',
                sessionId: sessionId
            });
        })
        .catch(renderErrorResponse(response));
};


