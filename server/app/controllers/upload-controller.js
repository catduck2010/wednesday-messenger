//define objects
const multer = require('multer');
const uploads = multer({dest: 'uploads/'});

// Take the parameter for upload and insert it into the
// Realtime Database under default path
exports.uploads = uploads;

exports.postImage = (req, res, next) => {

};
