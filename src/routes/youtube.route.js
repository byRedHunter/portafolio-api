const express = require('express')
const { createVideo, getVideos } = require('../controllers/youtube.controller')
const { multerImage } = require('../utils/multer')

const router = express.Router()

// api/youtube

// crear un nuevo video
router.post('/', multerImage.single('imageVideo'), createVideo)

router.get('/', getVideos)

module.exports = router
