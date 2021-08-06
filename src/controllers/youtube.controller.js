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

exports.getVideoById = async (req, res) => {
	try {
		const video = await youtubeModel.findById(req.params.id)

		resController(res, 200, video)
	} catch (error) {
		resController(res)
	}
}

exports.editVideo = async (req, res) => {
	try {
		console.log('id', req.params.id)
		const { title, desc, link } = req.body

		// obtenemos los datos de la DB del video a editar
		const video = await youtubeModel.findById(req.params.id)
		console.log(video)

		const data = {
			title,
			desc,
			link,
		}

		const newVideo = await youtubeModel.findOneAndUpdate(req.params.id, data, {
			new: true,
		})

		resController(res, 200, newVideo)
	} catch (error) {
		console.log(error)
		resController(res, 500, { message: 'Error al actualizar los datos.' })
	}
}

exports.editVideoImage = async (req, res) => {
	try {
		// obtenemos los datos de la DB del video a editar
		const video = await youtubeModel.findById(req.params.id)
		// eliminamos el archivo en cloudinary
		await cloudinary.uploader.destroy(video.cloudinaryId)
		// subimos la nueva imagen
		const uploadImage = await cloudinary.uploader.upload(req.file.path)

		const data = {
			image: uploadImage.secure_url,
			cloudinaryId: uploadImage.public_id,
		}

		const newVideoImage = await youtubeModel.findOneAndUpdate(
			req.params.id,
			data,
			{
				new: true,
			}
		)

		resController(res, 200, newVideoImage)
	} catch (error) {
		console.log(error)
		resController(res, 500, {
			message: 'Error al actualizar la imagen del video.',
		})
	}
}
