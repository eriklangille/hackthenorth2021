import { backendEndpoint } from "../static"

export async function getPhotoUrls(idType) {
	const userId = localStorage.getItem(idType)
	let res

	try {
		res = await fetch(`${backendEndpoint}photo/user/${userId}`)
	} catch (e) {
		console.log(e)
	}

	return res
}