const mongoose = require('mongoose')

const YoutubeSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	desc: {
		type: String,
		required: true,
		trim: true,
	},
	link: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
		trim: true,
	},
	cloudinaryId: {
		type: String,
		required: true,
		trim: true,
	},
})

module.exports = mongoose.model('Youtube', YoutubeSchema)
