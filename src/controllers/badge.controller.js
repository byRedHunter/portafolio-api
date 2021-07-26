const badgeModel = require('../models/badge.model')
const { resController } = require('../utils/res')

exports.createBadge = async (req, res) => {
	try {
		const { title } = req.body

		// existe este badge
		const badgeExist = await badgeModel.findOne({ title })
		if (badgeExist.title === title)
			return resController(res, 400, { message: 'Badge ya existe' })

		const badge = new badgeModel({ title })
		await badge.save()

		resController(res, 200, badge)
	} catch (error) {
		resController(res, 500, { message: 'Error al registrar.' })
	}
}

exports.getBadges = async (req, res) => {
	try {
		const badges = await badgeModel.find()

		resController(res, 200, badges)
	} catch (error) {
		resController(res)
	}
}

exports.editBadge = async (req, res) => {
	try {
		const { title } = req.body

		// existe este badge
		const badge = await badgeModel.findById(req.params.id)
		if (!badge)
			return resController(res, 400, { message: 'No existe el badge' })
		if (badge.title === title)
			return resController(res, 400, 'Este badge ya existe')

		const newBadge = { title }

		const result = await badgeModel.findOneAndUpdate(
			{ _id: req.params.id },
			newBadge
		)

		resController(res, 200, { message: 'Badge Actualizado' })
	} catch (error) {
		console.log(error)
		resController(res, 500, { message: 'Error al actualizar.' })
	}
}
