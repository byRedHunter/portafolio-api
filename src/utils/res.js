exports.resController = (
	res,
	code = 500,
	json = { error: true, message: 'Error en el servidor' }
) => {
	res.status(code).json(json)
}
