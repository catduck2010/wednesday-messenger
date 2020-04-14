'use strict';

const pbkdf2 = require('./pbkdf2');

exports.uuid = () => {
    // generate four random hex digits
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

exports.hashPassword = (password) => {
    return pbkdf2.hashPassword(password);
};
exports.password = (password, combined) => {
    return pbkdf2.verifyPassword(password, combined);
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
exports.renderErrorResponse = response => {
    return error => {
        if (error) {
            if (error.message === 'Access Denied')
                response.status(403);
            else response.status(500);

            response.json({
                message: error.message
            });
            console.log(error);
        }
    };
};

exports.refuseToResponse = response => {
    return error => {
        if (error) {
            response.status(403);
            response.json({
                message: error.message
            });
            console.log(error);
        }
    };
};


