import React from "react"
import { Link, Route, BrowserRouter, Switch } from "react-router-dom"
import { backendEndpoint } from "../static"
import './FamilyLogin.scss'

const FamilyLogin = ({ children }) => {
	let userId = localStorage.getItem("id")

	return userId ? children : (
		<BrowserRouter>
			<Switch>
				<Route path="/family/login">
					<Login />
				</Route>
				<Route path="/family/register">
					<Register />
				</Route>
				<Route path="/">
					<div class="phone horizontally-centered vertically-centered">
						<div class="logo"><img src='../bloom-logo.svg'></img></div>
						<div class="selection-screen">
							<div><Link to="/family/login"><input type="button" value="Create an account" class="primary-button"/></Link></div>
							<div><Link to="/family/register"><input type="button" value="Sign in to my account" class="secondary-button"/></Link></div>
						</div>
						<div class="background-image"><img src="../bloom-background.svg"></img></div>
					</div>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

const Login = () => {
	return <div class="phone horizontally-centered">
		<form onSubmit={async (e) => {
			e.preventDefault()

			const url = new URL(backendEndpoint + "family")

			url.search = new URLSearchParams([0, 1].map(i => e.target[i]).map(r => [
				r.name,
				r.value
			])).toString();
			const res = await fetch(url)
			const json = await res.json()
			localStorage.setItem("id", json.userId)
		}}>

			<div class="logo"><img src='../bloom-logo.svg'></img></div>
			<h1>Sign in</h1>
			<div class="input-form">
				<label>
					<div class="input-form-label">Phone number</div>
					<input type="text" name="phone" class="input-phonenumber" />
				</label>
			</div>
			<div class="input-form">
				<label>
					<div class="input-form-label">Password</div>
					<input type="password" name="password" class="input-password" />
				</label>
			</div>

			<input type="submit" value="Log in →" class="submit-button" />
		</form>

		<div class="footer-button">Don't have an account? <Link to="/family/register">Register here.</Link></div>
		<div class="background-image"><img src="../bloom-background.svg"></img></div>
	</div>
}

const Register = () => {
	return <div class="phone horizontally-centered">
		<form onSubmit={async (e) => {
			e.preventDefault()

			localStorage.setItem("id", e.target[4].value)

			const url = new URL(backendEndpoint + "family")

			url.search = new URLSearchParams([0, 1, 2, 3, 4].map(i => e.target[i]).map(r => [
				r.name,
				r.value
			])).toString();
		}}>
			<div class="logo"><img src='../bloom-logo.svg'></img></div>
			<h1>Create an account</h1>
			<div class="input-form">
				<label>
					<div class="input-form-label">Relative's account id</div>
					<input type="number" name="user" class="input-id" />
				</label>
			</div>
			<div class="input-form">
				<label>
					<div class="input-form-label">Phone number</div>
					<input type="text" name="phone" class="input-phonenumber" />
				</label>
			</div>
			<div class="input-form">
				<label>
					<div class="input-form-label">First name</div>
					<input type="text" name="firstname" class="input-firstname" />
				</label>
			</div>
			<div class="input-form">
				<label>
					<div class="input-form-label">Last name</div>
					<input type="text" name="lastname" class="input-lastname" />
				</label>
			</div>
			<div class="input-form">
				<label>
					<div class="input-form-label">Password</div>
					<input type="password" name="password" class="input-password" />
				</label>
			</div>

			<input type="submit" value="Register →" class="submit-button" />
		</form>

		<div class="footer-button">Already have an account? <Link to="/family/login">Sign in.</Link></div>
		<div class="background-image"><img src="../bloom-background.svg"></img></div>
	</div>
}

export default FamilyLogin