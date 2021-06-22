const express = require('express')
const { createBadge, getBadges } = require('../controllers/badge.controller')

const router = express.Router()

// api/badge

// crear un nuevo badge
router.post('/', createBadge)

// listar badges
router.get('/', getBadges)

module.exports = router
