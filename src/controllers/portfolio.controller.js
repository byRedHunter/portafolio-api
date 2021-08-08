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

exports.getWorkById = async (req, res) => {
	try {
		const work = await portfolioModel.findById(req.params.id)

		resController(res, 200, work)
	} catch (error) {
		resController(res, 500, { message: 'El proyecto seleccionado no existe' })
	}
}

exports.editWork = async (req, res) => {
	try {
		const idToEdit = req.params.id

		const work = await portfolioModel.findById(idToEdit)

		if (!work)
			return resController(res, 400, { message: 'No existe el proyecto.' })

		const newWork = await portfolioModel.findByIdAndUpdate(idToEdit, req.body, {
			new: true,
		})

		resController(res, 200, newWork)
	} catch (error) {
		console.log(error)
		resController(res, 500, { message: 'Error al actualizar los datos.' })
	}
}

exports.editWorkImage = async (req, res) => {
	try {
		// obtenemos los datos de la DB del video a editar
		const work = await portfolioModel.findById(req.params.id)
		// eliminamos el archivo en cloudinary
		await cloudinary.uploader.destroy(work.cloudinaryId)
		// subimos la nueva imagen
		const uploadImage = await cloudinary.uploader.upload(req.file.path)

		const data = {
			image: uploadImage.secure_url,
			cloudinaryId: uploadImage.public_id,
		}

		const newWorkImage = await portfolioModel.findByIdAndUpdate(
			req.params.id,
			data,
			{
				new: true,
			}
		)

		resController(res, 200, newWorkImage)
	} catch (error) {
		console.log(error)
		resController(res, 500, { message: 'Error al actualizar los datos.' })
	}
}

exports.deleteWork = async (req, res) => {
	try {
		const work = await portfolioModel.findById(req.params.id)
		await cloudinary.uploader.destroy(work.cloudinaryId)
		await work.remove()

		resController(res, 200, { message: 'Proyecto eliminado' })
	} catch (error) {
		console.log(error)
		resController(res, 500, { message: 'El video seleccionado no existe' })
	}
}
