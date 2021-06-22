const mongoose = require('mongoose')

const BadgeSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
})

module.exports = mongoose.model('Badge', BadgeSchema)
