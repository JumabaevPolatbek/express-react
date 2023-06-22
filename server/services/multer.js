const multer = require('multer');
const path = require('path');
const storageConfig = multer.diskStorage({
	destination: 'uploads/images',
	filename: (req, file, cb) => {
		cb(
			null,
			Date.now() + path.extname(file.originalname)
		);
	},
	limits: {
		fileSize: 5000000,
	},
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == 'image/png' ||
			file.mimetype == 'image/jpg' ||
			file.mimetype == 'image/jpeg'
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(
				new Error(
					'Only .png, .jpg and .jpeg format allowed!'
				)
			);
		}
	},
});

module.exports = storageConfig;
