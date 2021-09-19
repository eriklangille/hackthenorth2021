import React from "react"
import { Link } from "react-router-dom"
import { backendEndpoint } from "../static"
import { familyId } from "../Utils/ids"
import './Family.scss'

function logout() {
	localStorage.clear()
	window.location.reload(false);
}

const FamilyHome = () => {
	return (
		<div class="phone horizontally-centered vertically-centered">
			<div>test</div>
			<div class="logo"><img src='../bloom-logo.svg'></img></div>
			<div class="selection-screen">
				<div><Link to="/family/login"><input type="button" value="button1" class="primary-button" /></Link></div>
				<div><Link to="/family/register"><input type="button" value="button2" class="secondary-button" /></Link></div>
			</div>
			<div class="footer-button">All done? <Link to="/family" onClick={logout}>Sign out here.</Link></div>
			<div class="background-image"><img src="../bloom-background.svg"></img></div>
		</div>
	)
}

export default FamilyHome