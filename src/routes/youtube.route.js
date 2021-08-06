const express = require('express')
const {
	createVideo,
	getVideos,
	editVideo,
	editVideoImage,
	getVideoById,
} = require('../controllers/youtube.controller')
const { multerImage } = require('../utils/multer')

const router = express.Router()

// api/youtube

// crear un nuevo video
router.post('/', multerImage.single('imageVideo'), createVideo)

// listar videos
router.get('/', getVideos)
router.get('/:id', getVideoById)

// editar un video
router.put('/:id', editVideo)
router.put('/image/:id', multerImage.single('imageVideo'), editVideoImage)

module.exports = router
