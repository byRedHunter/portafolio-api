const express = require('express')
const {
	createVideo,
	getVideos,
	editVideo,
	editVideoImage,
	getVideoById,
	deleteVideo,
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

// eliminar un video
router.delete('/:id', deleteVideo)

module.exports = router
