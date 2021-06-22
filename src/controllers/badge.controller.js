const badgeModel = require('../models/badge.model')
const { resController } = require('../utils/res')

exports.createBadge = async (req, res) => {
	try {
		const { title } = req.body

		const badge = new badgeModel({ title })

		await badge.save()

		resController(res, 200, badge)
	} catch (error) {
		resController(res)
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
