import { useEffect, useState } from "react";

export function useAwait(fun, initialValue = null) {
	const [data, setData] = useState(initialValue)
	useEffect(() => {
		fun()
			.then(res => {
				setData(res)
			})
	}, [setData])

	return data
}