'use strict';
const userService = require('../services/user-service');
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
    const promise = userService.search(user);
    promise
        .then((res) => {
            if (!res) {
                return userService.create(user);
            } else {
                throw new Error('User exists!');
            }
        })
        .then(newUser => {
            response.status(201);
            response.json(newUser);
        })
        .catch(renderErrorResponse(response));
};

