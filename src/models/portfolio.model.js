const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PortfolioSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	//badges: [mongoose.Types.ObjectId],
	badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
	desc: {
		type: String,
		required: true,
		trim: true,
	},
	preview: {
		type: String,
		required: true,
		trim: true,
	},
	repository: {
		type: String,
		required: true,
		trim: true,
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

PortfolioSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Portfolio', PortfolioSchema)
