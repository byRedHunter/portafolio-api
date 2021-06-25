const express = require('express')
const { createWork } = require('../controllers/portfolio.controller')
const { multerImage } = require('../utils/multer')

const router = express.Router()

// api/portfolio

// creamos un nuevo trabajo para el portafolio
router.post('/', multerImage.single('imageWork'), createWork)

module.exports = router
