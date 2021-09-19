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
		<div class="phone horizontally-centered">
			<div class="logo"><img src='../bloom-logo.svg'></img></div>
			<div class="relative-photo"></div>
			<div class="relative-name">Mary</div>
			<div class="relative-description">Send Mary some love by sharing a recent photo and attaching a note.</div>
			<div class="selection-screen">
				<div><Link to="#"><input type="button" value="Send photo" class="primary-button" /></Link></div>
				<div><Link to="#"><input type="button" value="Edit daily checklist" class="secondary-button" /></Link></div>
			</div>
			<div class="footer-button">All done? <Link to="/family" onClick={logout}>Sign out here.</Link></div>
			<div class="background-image"><img src="../bloom-background.svg"></img></div>
		</div>
	)
}

export default FamilyHome