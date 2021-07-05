const express = require('express')
const { createWork, getWorks } = require('../controllers/portfolio.controller')
const { multerImage } = require('../utils/multer')

const router = express.Router()

// api/portfolio

// creamos un nuevo trabajo para el portafolio
router.post('/', multerImage.single('imageWork'), createWork)

// obtenemos todos los trabajos
router.get('/', getWorks)

module.exports = router
