require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// inicializamos la app
const app = express()

// middleware
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

// rutas
app.use('/', (req, res) => {
	res.send({ msg: 'Funciona OK' })
})

// iniciamos el server
app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})
