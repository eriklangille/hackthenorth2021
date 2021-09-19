import React from "react"
import { Link } from "react-router-dom"
import ChecklistItem from "./ChecklistItem"
import { backendEndpoint } from "../static"
import { familyId } from "../Utils/ids"
import './Family.scss'

const FamilyChecklist = () => {
	return (
		<div class="phone horizontally-centered">
			<div className="checklist">
                <ChecklistItem status={true} name="Breakfast" time="6:30am"></ChecklistItem>
                <ChecklistItem status={false} name="Morning medication" time="10:00am"></ChecklistItem>
                <ChecklistItem status={false} name="Lunch" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Dinner" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Night medication" time=""></ChecklistItem>
            </div>
			<div class="background-image"><img src="../bloom-background.svg"></img></div>
		</div>
	)
}

export default FamilyChecklist