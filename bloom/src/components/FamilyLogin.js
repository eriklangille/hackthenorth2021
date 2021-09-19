import React from "react"
import { Link, Route, BrowserRouter, Switch } from "react-router-dom"
import { backendEndpoint } from "../static"
import { familyId } from "../Utils/ids"
import './Family.scss'

const FamilyLogin = ({ children }) => {
	let familyid = localStorage.getItem(familyId)

	return familyid ? children : (
		<BrowserRouter>
			<Switch>
				<Route path="/family/login">
					<Login />
				</Route>
				<Route path="/family/register">
					<Register />
				</Route>
				<Route path="/">
					<div className="phone horizontally-centered">
						<div className="vertically-centered">
							<div className="logo"><img src='../bloom-logo.svg'></img></div>
							<div className="selection-screen">
								<div><Link to="/family/register"><input type="button" value="Create an account" className="primary-button" /></Link></div>
								<div><Link to="/family/login"><input type="button" value="Sign in to my account" className="secondary-button" /></Link></div>
							</div>
						</div>
						<div className="background-image"><img src="../bloom-background.svg"></img></div>
					</div>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

const Login = () => {
	return <div className="phone horizontally-centered">
		<form onSubmit={async (e) => {
			e.preventDefault()

			const url = new URL(backendEndpoint + "family")

			url.search = new URLSearchParams([0, 1].map(i => e.target[i]).map(r => [
				r.name,
				r.value
			])).toString();
			const res = await fetch(url)
			const json = await res.json()
			localStorage.setItem(familyId, json.userId)

			window.location.reload(false); // page reload
		}}>

			<div className="logo"><img src='../bloom-logo.svg'></img></div>
			<h1>Sign in</h1>
			<div className="input-form">
				<label>
					<div className="input-form-label">Phone number</div>
					<input type="text" name="phone" placeholder="(000) 000 0000" className="input-phonenumber" />
				</label>
			</div>
			<div className="input-form">
				<label>
					<div className="input-form-label">Password</div>
					<input type="password" name="password" className="input-password" />
				</label>
			</div>

			<input type="submit" value="Log in →" className="submit-button"/>
		</form>

		<div className="footer-button">Don't have an account? <Link to="/family/register">Register here.</Link></div>
		<div className="background-image"><img src="../bloom-background.svg"></img></div>
	</div>
}

const Register = () => {
	return <div className="phone horizontally-centered">
		<form onSubmit={async (e) => {
			console.log("HELLO")
			e.preventDefault()

			localStorage.setItem(familyId, e.target[4].value)

			const url = new URL(backendEndpoint + "family")

			url.search = new URLSearchParams([0, 1, 2, 3, 4].map(i => e.target[i]).map(r => [
				r.name,
				r.value
			])).toString();

			fetch(url, {
				method: 'post'
			})
			
			window.location.reload(false); // page reload
		}}>
			<div className="logo"><img src='../bloom-logo.svg'></img></div>
			<h1>Create an account</h1>
			<div className="input-form">
				<label>
					<div className="input-form-label">Relative's account id</div>
					<input type="number" name="user" placeholder="123456789" className="input-id" />
				</label>
			</div>
			<div className="input-form">
				<label>
					<div className="input-form-label">Phone number</div>
					<input type="text" name="phone" placeholder="(000) 000 0000" className="input-phonenumber" />
				</label>
			</div>
			<div className="input-form">
				<label>
					<div className="input-form-label">First name</div>
					<input type="text" name="firstname" placeholder="Jane" className="input-firstname" />
				</label>
			</div>
			<div className="input-form">
				<label>
					<div className="input-form-label">Last name</div>
					<input type="text" name="lastname" placeholder="Doe" className="input-lastname" />
				</label>
			</div>
			<div className="input-form">
				<label>
					<div className="input-form-label">Password</div>
					<input type="password" name="password" className="input-password" />
				</label>
			</div>

			<input type="submit" value="Register →" className="submit-button" />
		</form>

		<div className="footer-button">Already have an account? <Link to="/family/login">Sign in.</Link></div>
		<div className="background-image"><img src="../bloom-background.svg"></img></div>
	</div>
}

export default FamilyLogin