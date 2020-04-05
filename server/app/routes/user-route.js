'use strict';

const mainController = require('../controllers/main-controller');

module.exports = app =>{
    app.route('/register')
        .post(mainController.register);
};
