import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { backendEndpoint } from "../../static";

export default function SettingPage() {
	const [state, setState] = useState(null)
	const history = useHistory();

	const user = localStorage.getItem("id")

	useEffect(() => {
		const fetchData = async () => {

			const user = localStorage.getItem("id")

			const url = new URL(backendEndpoint + "user")
			url.search = new URLSearchParams({ user }).toString();
			const query = await fetch(url)
			const data = await query.json()
			setState({
				first: data.FirstName,
				last: data.LastName
			})
		}
		fetchData()
	}, [setState])

	return !state ? null : (
		<div>
			<form onSubmit={async (e) => {
				e.preventDefault()

				const url = new URL(backendEndpoint + "user")

				url.search = new URLSearchParams([
					['user', user],
					...[0, 1].map(i => e.target[i]).map(r => [
						r.name,
						r.value
					])]).toString();
				await fetch(url, {
					method: 'post'
				})

				history.push("/")
			}}>
				<label>
					First Name
					<input type="text" name="firstname" placeholder={state.first} />
				</label>
				<label>
					Last Name
					<input type="text" name="lastname" placeholder={state.last} />
				</label>

				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}