import React from 'react';
import { useState } from 'react';
import '../App.scss';
import '../styles/checklist-item.scss';

const ChecklistItem = (props) => {
    let [state, setState] = useState(props.status)

    let addClass = "";
    let dateContext = "scheduled for"
    if (state) {
        addClass = " checked"
        dateContext = "completed at"
    }
    if (props.time == "" || props.time == null) {
        dateContext = "";
    }

    return (
        <div className={"checklist-item" + addClass} onClick={() => {setState(!state)}}>
            <div className="checklist-item-status"></div>
            <div className="checklist-item-name">{props.name}</div>
            <div className="checklist-item-date">{dateContext} {props.time}</div>
        </div>
    )
}

export default ChecklistItem