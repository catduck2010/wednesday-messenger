'use strict';
const uploadCtrl = require('../controllers/upload-controller');
module.exports = app => {
    app.route('/photos').post(uploadCtrl.uploads, uploadCtrl.postImage);
}


