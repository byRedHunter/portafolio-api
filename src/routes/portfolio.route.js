const express = require('express')
const {
	createWork,
	getWorks,
	getWorkById,
	editWork,
	editWorkImage,
	deleteWork,
} = require('../controllers/portfolio.controller')
const { multerImage } = require('../utils/multer')

const router = express.Router()

// api/portfolio

// creamos un nuevo trabajo para el portafolio
router.post('/', multerImage.single('imageWork'), createWork)

// obtenemos todos los trabajos
router.get('/', getWorks)
router.get('/:id', getWorkById)

// editar proyecto
router.put('/:id', editWork)
router.put('/image/:id', multerImage.single('imageWork'), editWorkImage)

// eliminar proyecto
router.delete('/:id', deleteWork)

module.exports = router
