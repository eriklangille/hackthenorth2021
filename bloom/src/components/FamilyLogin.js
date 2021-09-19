import { Link, Route, BrowserRouter, Switch } from "react-router-dom"
import { backendEndpoint } from "../static"

const FamilyLogin = ({ children }) => {
	let familyid = localStorage.getItem("familyid")

	return familyid ?
		<div>
			<button onClick={() => localStorage.clear()}>Logout</button>
			{children}
		</div> : (
			<BrowserRouter>
				<Switch>
					<Route path="/family/login">
						<Login />
					</Route>
					<Route path="/family/register">
						<Register />
					</Route>
					<Route path="/">
						<Link to="/family/login">Login</Link>
						<Link to="/family/register">Register</Link>
					</Route>
				</Switch>
			</BrowserRouter>
		)
}

const Login = () => {
	return <div>
		<form onSubmit={async (e) => {
			e.preventDefault()

			const url = new URL(backendEndpoint + "family")

			url.search = new URLSearchParams([0, 1].map(i => e.target[i]).map(r => [
				r.name,
				r.value
			])).toString();
			const res = await fetch(url)
			const json = await res.json()
			localStorage.setItem("familyid", json.userId)
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
}

const Register = () => {
	return <div>
		<form onSubmit={async (e) => {
			e.preventDefault()

			localStorage.setItem("familyid", e.target[4].value)

			const url = new URL(backendEndpoint + "family")

			url.search = new URLSearchParams([0, 1, 2, 3, 4].map(i => e.target[i]).map(r => [
				r.name,
				r.value
			])).toString();
		}}>
			<label>
				Phone Number (with area code):
				<input type="text" name="phone" />
			</label>
			<label>
				First Name
				<input type="text" name="firstname" />
			</label>
			<label>
				Last Name
				<input type="text" name="lastname" />
			</label>
			<label>
				Password:
				<input type="password" name="password" />
			</label>
			<label>
				Customer's id:
				<input type="number" name="user" />
			</label>

			<input type="submit" value="Submit" />
		</form>
	</div>
}

export default FamilyLogin