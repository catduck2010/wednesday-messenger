'use strict';

const crypto = require('crypto');

exports.uuid = () => {
    // generate four random hex digits
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

exports.password = (str) => {
    return str;
};
