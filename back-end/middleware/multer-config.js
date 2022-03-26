const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage: storage }).single('image');
