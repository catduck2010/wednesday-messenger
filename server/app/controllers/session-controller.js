'use strict';

//define object
const userMap = require('../helper/usermap');

// Take the parameter for verify id and insert it into the
// Realtime Database under default path
exports.verify = (sessionId) => userMap.session(sessionId) !== null;
