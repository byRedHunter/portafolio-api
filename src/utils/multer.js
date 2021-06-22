const multer = require('multer')
const path = require('path')

// multer config image
exports.multerImage = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		let extension = path.extname(file.originalname)

		if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
			cb(new Error('File type is not supported'), false)

			return
		}

		cb(null, true)
	},
})
