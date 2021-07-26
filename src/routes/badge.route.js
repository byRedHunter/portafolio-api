const express = require('express')
const {
	createBadge,
	getBadges,
	editBadge,
} = require('../controllers/badge.controller')

const router = express.Router()

// api/badge

// crear un nuevo badge
router.post('/', createBadge)

// listar badges
router.get('/', getBadges)

// editar badge
router.put('/:id', editBadge)

module.exports = router
