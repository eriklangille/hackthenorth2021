import { backendEndpoint } from "../static"

export async function getChecklistData(idType) {
	const userId = localStorage.getItem(idType)
	let res

	try {
		res = await fetch(`${backendEndpoint}reminders/${userId}`)
		res = await res.json()
	} catch (e) {
		console.log(e)
	}

	return res
}