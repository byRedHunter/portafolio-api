exports.resController = (res, code, json) => {
	res.status(code).json(json)
}
