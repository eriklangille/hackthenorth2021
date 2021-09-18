exports.phoneNumberFormatter = (string) => {
	return "+" + string.replace(/[^0-9]/g, "").substring(0, 11)
}
