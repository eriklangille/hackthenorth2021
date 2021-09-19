export default function SettingPage() {
	const user = localStorage.getItem("id")

	return (
		<div>
			<form onSubmit={async (e) => {
				e.preventDefault()

				const url = new URL(backendEndpoint + "family")

				url.search = new URLSearchParams([
					['user', user],
					...[0, 1].map(i => e.target[i]).map(r => [
						r.name,
						r.value
					])]).toString();
				const res = await fetch(url)
				const json = await res.json()
			}}>
				<label>
					Phone Number (with area code):
					<input type="text" name="phone" />
				</label>
				<label>
					Password:
					<input type="password" name="password" />
				</label>

				<input type="submit" value="Submit" />
			</form>
		</div>