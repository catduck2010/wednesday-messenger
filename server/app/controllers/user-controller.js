'use strict';
const userService = require('../services/user-service'),
    common = require('../helper/common'),
    renderErrorResponse = common.renderErrorResponse;


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
    const user = Object.assign({}, request.body);
    user._id = common.uuid();
    const promise = common.hashPassword(user.password);
    promise
        .then((pw) => { // hash password
            user.password = pw;
            return userService.search(user.username);
        })
        .then((u) => {
            if (!u) { // check user existence
                // console.log('Username not used!');
                return userService.create(user);
            } else {
                throw new Error(`User exists!`);
            }
        })
        .then(newUser => { // user created
            response.status(201);
            response.json(newUser);
        })
        .catch(renderErrorResponse(response));
};

exports.verify = (request, response) => {
    const sessionId = common.uuid();
    const username = request.body.username, password = request.body.password;
    const promise = userService.search(username);
    let userId = '';
    promise
        .then(user => { // find the user
            if (user === null || user === undefined) {
                throw new Error('Incorrect username or password.');
                // return userService.newSession(user.username, sessionId);
            } else {
                userId = user._id;
                return common.password(password, user.password);
            }
        })
        .then((flag) => { // check password
            if (flag) return userService.newSession(username, sessionId);
            else throw new Error('Incorrect username or password.');
        })
        .then(() => { // log in succeeded
            response.status(200);
            response.json({
                message: 'Logged in',
                userId: userId,
                sessionId: sessionId
            });
        })
        .catch(renderErrorResponse(response));
};

exports.getByUsername = (req, res) => {
    const username = req.params.username;
    const promise = userService.search(username);
    promise
        .then((doc) => {
            res.status(200);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

exports.getById = (req, res) => {
    const userId = req.params.userId;
    const promise = userService.get(userId);
    promise
        .then((doc) => {
            res.status(200);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

exports.updateById = (req, res) => {
    const userId = req.params.userId,
        sessionId = req.body.sessionId,
        item = Object.assign({}, req.body);
    item._id = userId;
    const promise = userService.get(userId);
    promise
        .then((doc) => {
            if (doc === null || doc === undefined) {
                throw new Error('User not found!');
            } else if (doc.sessionId !== sessionId) {
                throw new Error('Access Denied');
            } else {
                return userService.update(item);
            }
        })
        .then(() => {
            return userService.get(userId);
        })
        .then((doc) => {
            res.status(200);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

exports.deleteById = (req, res) => {
    const userId = req.params.userId,
        sessionId = req.body.sessionId;
    const promise = userService.get(userId);
    promise
        .then((doc) => {
            if (doc === null || doc === undefined) {
                throw new Error('User not found!');
            } else if (doc.sessionId !== sessionId) {
                throw new Error('Access Denied');
            } else {
                return userService.delete(userId);
            }
        })
        .then(() => {
            res.status(200);
            res.json({
                'message': `User ${userId} is deleted.`
            })
        })
        .catch(renderErrorResponse(res));
};




