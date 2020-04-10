'use strict';
const userMap = require('../helper/usermap');

exports.verify = (sessionId) => userMap.session(sessionId) !== null;
