const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/pokemon'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const safeName = Date.now() + '-' + Math.round(Math.random() * 1e6) + ext;
        cb(null, safeName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const valid = allowed.test(path.extname(file.originalname).toLowerCase()) &&
                    allowed.test(file.mimetype);
    cb(null, valid);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); //máx 5MB, limitado a imagenes