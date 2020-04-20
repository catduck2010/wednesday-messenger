const multer = require('multer');
const uploads = multer({dest: 'uploads/'});


exports.uploads = uploads;

exports.postImage = (req, res, next) => {

};
