const {
	privateEncrypt, createHmac
} = require('crypto');


exports.create = (phone, password) => {
	const saltedPassword = phone.substring(2, 11) + password;
	console.log(saltedPassword)
	return generateHash(saltedPassword)
}

exports.validate = (phone, password, hash) => {
	const saltedPassword = phone.substring(2, 11) + password;
	console.log(saltedPassword)
	return generateHash(saltedPassword) === hash
}

const generateHash = (string) => {
	return createHmac('sha256', process.env.secret)
		.update(string)
		.digest('base64')
}

