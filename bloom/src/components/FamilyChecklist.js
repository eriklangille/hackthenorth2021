import React from "react"
import { Link } from "react-router-dom"
import { ChecklistItem, NewChecklistButton } from "./ChecklistItem"
import { backendEndpoint } from "../static"
import { familyId } from "../Utils/ids"
import './Family.scss'
import { useAwait } from "../Utils/await"
import { getChecklistData } from "../Utils/checklist"

const FamilyChecklist = () => {
	const todoData = useAwait(() => getChecklistData(familyId), [])
	console.log(localStorage.getItem(familyId))

	return (
		<div className="phone horizontally-centered">
			<div className="family-nav">
				<Link to="/family"><span className="back-button">Back</span></Link>
				<h1>Edit Checklist</h1>
			</div>
			<div className="checklist family-checklist">
				{todoData.map(r => (
					<ChecklistItem
						loginType={familyId}
						data={r}
					/>
				))}
				<NewChecklistButton loginType={familyId} />
			</div>
			<div className="background-image"><img src="../bloom-background.svg"></img></div>
		</div>
	)
}

export default FamilyChecklist