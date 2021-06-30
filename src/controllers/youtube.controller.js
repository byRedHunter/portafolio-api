const youtubeModel = require('../models/youtube.model')
const cloudinary = require('../utils/cloudinary')
const { pagination } = require('../utils/pagination')
const { resController } = require('../utils/res')

exports.createVideo = async (req, res) => {
	try {
		const resultUploadImage = await cloudinary.uploader.upload(req.file.path)

		// creamos un nuevo video
		const { title, desc, link } = req.body
		const video = new youtubeModel({
			title,
			desc,
			link,
			image: resultUploadImage.secure_url,
			cloudinaryId: resultUploadImage.public_id,
		})

		// registramos el video
		await video.save()

		resController(res, 200, video)
	} catch (error) {
		resController(res)
	}
}

exports.getVideos = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit, 10) || pagination.limit
		const page = parseInt(req.query.page, 10) || pagination.page

		const videos = await youtubeModel.paginate(
			{},
			{ limit, page, sort: { createdAt: -1 } }
		)

		resController(res, 200, videos)
	} catch (error) {
		resController(res)
	}
}
