const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URI

mongoose.set('useCreateIndex', true)

const connectionDB = async () => {
	try {
		await mongoose.connect(
			connectionString,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			},
			() => {
				console.log('DB connected successfully')
			}
		)
	} catch (error) {
		console.log(`Error in DB: ${error}`)
		process.exit(1)
	}
}

module.exports = connectionDB
