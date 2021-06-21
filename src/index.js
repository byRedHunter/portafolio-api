require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const connectionDB = require('./db')

// inicializamos la app
const app = express()

// llamamos a la conexion DB
connectionDB()

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
