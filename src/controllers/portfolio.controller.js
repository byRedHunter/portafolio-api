const { resController } = require('../utils/res')
const cloudinary = require('../utils/cloudinary')
const portfolioModel = require('../models/portfolio.model')
const { pagination } = require('../utils/pagination')

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

exports.getWorks = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit, 10) || pagination.limit
		const page = parseInt(req.query.page, 10) || pagination.page

		const works = await portfolioModel.paginate(
			{},
			{
				limit,
				page,
				populate: { path: 'badges', select: 'title' },
				sort: { createdAt: -1 },
			}
		)

		/* const works = await portfolioModel.find().populate('badges', 'title') */

		resController(res, 200, works)
	} catch (error) {
		resController(res)
	}
}
