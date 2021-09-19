import React from "react"
import { Link } from "react-router-dom"
import ChecklistItem from "./ChecklistItem"
import { backendEndpoint } from "../static"
import { familyId } from "../Utils/ids"
import './Family.scss'

const FamilyChecklist = () => {
	return (
		<div className="phone horizontally-centered">
			<div className="family-nav">
				<Link to="/family"><span className="back-button"><img src="../arrow-left-circle.svg" width="50px" height="50px"/></span></Link>
				<h1>Edit Checklist</h1>
			</div>
			<div className="checklist family-checklist">
                <ChecklistItem status={true} name="Breakfast" time="6:30am"></ChecklistItem>
                <ChecklistItem status={false} name="Morning medication" time="10:00am"></ChecklistItem>
                <ChecklistItem status={false} name="Lunch" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Dinner" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Night medication" time=""></ChecklistItem>
            </div>
			<div className="background-image"><img src="../bloom-background.svg"></img></div>
		</div>
	)
}

export default FamilyChecklist