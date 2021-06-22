const express = require('express')
const { createVideo } = require('../controllers/youtube.controller')
const { multerImage } = require('../utils/multer')

const router = express.Router()

// api/youtube

// crear un nuevo video
router.post('/', multerImage.single('imageVideo'), createVideo)

router.get('/', (req, res) => {
	res.send({ message: 'si funciona la ruta' })
})

module.exports = router
