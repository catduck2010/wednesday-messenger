'use strict';
const userService = require('../services/user-service'),
    common = require('../services/common-service');
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = response => {
    return error => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
};

exports.register = (request, response) => {
    let user = Object.assign({}, request.body);
    const promise = userService.create(user);
    promise
        .then(newUser => {
            response.status(201);
            response.json(newUser);
        })
        .catch(renderErrorResponse(response));
};

exports.verify = (request, response) => {
    const username = request.body.username, password = request.body.password;
    const promise = userService.search(username);
    promise
        .then(user => {
            if (common.password(password) === user.password) {
                response.status(200);
                response.json({
                    message: 'Logged in',
                    sessionId: common.uuid()
                });
            } else {
                throw new Error('Incorrect username or password.');
            }
        })
        .catch(renderErrorResponse(response));
};


