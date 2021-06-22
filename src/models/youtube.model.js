const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
})

YoutubeSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Youtube', YoutubeSchema)
