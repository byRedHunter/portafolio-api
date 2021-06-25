const { resController } = require('../utils/res')
const cloudinary = require('../utils/cloudinary')
const portfolioModel = require('../models/portfolio.model')

exports.createWork = async (req, res) => {
	try {
		const resultUploadImage = await cloudinary.uploader.upload(req.file.path)

		// creamos un nuevo trabajo
		const { title, badges, desc, preview, repository } = req.body
		const work = new portfolioModel({
			title,
			badges,
			desc,
			preview,
			repository,
			image: resultUploadImage.secure_url,
			cloudinaryId: resultUploadImage.public_id,
		})

		// registramos el trabajo
		await work.save()

		resController(res, 200, work)
	} catch (error) {
		resController(res)
	}
}
