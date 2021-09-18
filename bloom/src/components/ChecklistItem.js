import React from 'react';
import '../App.scss';
import '../styles/checklist-item.scss';

// todo: status variable

const ChecklistItem = (props) => {
    let addClass = "";
    let dateContext = "scheduled for"
    if (props.status) {
        addClass = " checked"
        dateContext = "completed at"
    }
    if (props.time == "" || props.time == null) {
        dateContext = "";
    }

    return (
        <div className={"checklist-item" + addClass}>
            <div className="checklist-item-status"></div>
            <div className="checklist-item-name">{props.name}</div>
            <div className="checklist-item-date">{dateContext} {props.time}</div>
        </div>
    )
}

export default ChecklistItem