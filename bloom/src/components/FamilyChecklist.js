import React from "react"
import { Link } from "react-router-dom"
import { ChecklistItem } from "./ChecklistItem"
import { backendEndpoint } from "../static"
import { familyId } from "../Utils/ids"
import './Family.scss'

const FamilyChecklist = () => {
	return (
		<div class="phone horizontally-centered">
			<div className="checklist">
			</div>
			<div class="background-image"><img src="../bloom-background.svg"></img></div>
		</div>
	)
}

export default FamilyChecklist