'use strict';
//define objects
const userService = require('../services/user-service'),
    chatService = require('../services/chat-service'),
    common = require('../helper/common'),
    renderErrorResponse = common.renderErrorResponse;

// Take the parameter and insert it into the
// Realtime Database under default path
exports.test = (req, res) => {
    res.send('');
};

exports.uuid = (req, res) => {
    res.status(201);
    res.json({
        uuid: common.uuid()
    });
};

// Take the parameter and insert it into the
// Realtime Database under default path
exports.register = (request, response) => {
    //grab parameter
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
        .then(newUser => { // user created, respond
            response.status(201);
            response.json(newUser);
        })
        .catch(renderErrorResponse(response));
};

// Take the parameter for verify and corresponding and insert it into the
// Realtime Database under default path
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

// get all users
exports.getAllUsers = (req, res) => {
    const promise = userService.find({});// get all
    promise
        .then((doc) => { // respond
            res.status(200);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// get user by its username
exports.getByUsername = (req, res) => {
    //grab parameter
    const username = req.params.username;
    const promise = userService.search(username);
    promise
        .then((doc) => {
            res.status(200);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// get user by its id
exports.getById = (req, res) => {
    //grab parameter
    const userId = req.params.userId;
    const promise = userService.get(userId);
    promise
        .then((doc) => {
            res.status(200);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// Take the parameter for update info and insert it into the
// Realtime Database under default path
exports.updateById = (req, res) => {
    //grab parameter
    const userId = req.params.userId,
        sessionId = req.body.sessionId,
        password = req.body.password,
        newPassword = req.body.newPassword,
        item = Object.assign({}, req.body);
    item._id = userId;
    let userDoc = null;
    const promise = userService.get(userId);
    promise
        .then((doc) => { // check qualification to update
            if (doc === null || doc === undefined) {
                throw new Error('User not found!');
            } else if (doc.sessionId !== sessionId || sessionId !== 'development') {
                throw new Error('Access Denied');
            } else {
                userDoc = doc;
                return common.password(password, doc.password);
            }
        })
        .then((flag) => { // check password
            if (flag) {
                return common.hashPassword(newPassword);
            } else {
                throw new Error('Wrong Password!');
            }
        })
        .then((pw) => { // change password & update
            item.password = pw;
            return userService.update(item);
        })
        .then(() => { // get updated user info
            return userService.get(userId);
        })
        .then((doc) => { // get doc & respond
            res.status(200);
            res.json(doc);
        })
        .catch(renderErrorResponse(res));
};

// delete user by its id
// Take the parameter for delete info and insert it into the
// Realtime Database under default path
exports.deleteById = (req, res) => {
    //grab parameter
    const userId = req.params.userId,
        sessionId = req.body.sessionId;
    const promise = userService.get(userId);
    promise
        .then((doc) => { // check existence & qualification
            if (doc === null || doc === undefined) {
                throw new Error('User not found!');
            } else if (doc.sessionId !== sessionId || sessionId !== 'development') {
                throw new Error('Access Denied');
            } else {
                return userService.delete(userId);
            }
        })
        .then(() => { // delete & respond
            res.status(200);
            res.json({
                'message': `User ${userId} is deleted.`
            })
        })
        .catch(renderErrorResponse(res));
};

// get all chats from a user
exports.getAllChatsInfo = (req, res) => {
    const userId = req.params.userId;
    const promise = userService.get(userId);
    promise
        .then((doc) => { // get user's chat list
            const chats = doc.chatList;
            return chatService.search({_id: {$in: chats}});
        })
        .then((items) => { // get chats & respond
            res.status(200);
            res.json(items);
        })
        .catch(renderErrorResponse(res));
}

// get all friends from a user's friend list
exports.getAllFriendsInfo = (req, res) => {
    const userId = req.params.userId;
    const promise = userService.get(userId);
    promise
        .then((doc) => { // check
            const friends = doc.friendList;
            return userService.find({_id: {$in: friends}});
        })
        .then((items) => { // get users & respond
            res.status(200);
            res.json(items);
        })
        .catch(renderErrorResponse(res));
}




