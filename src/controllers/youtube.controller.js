const youtubeModel = require('../models/youtube.model')
const cloudinary = require('../utils/cloudinary')

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

		res.status(200).json(video)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ errors: 'Error en el servidor' })
	}
}
